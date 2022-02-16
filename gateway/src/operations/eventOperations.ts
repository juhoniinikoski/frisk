import axios from "axios";
import { InvalidIdError, NameTakenError } from "./errors";
import { Event as EventType, User } from "../entities";
import { getLocation } from "./locationOperations";
import { getActivity } from "./activityOperations";
import { EVENT_SERVICE_URL } from "../utils/config";
import { object, string, number, date, bool } from 'yup';
import { locationActivityAdd, locationActivityDelete } from "./joinTableOperations";
import { ApolloError, AuthenticationError } from "apollo-server";

/* eslint-disable @typescript-eslint/no-unsafe-return */

interface Event {
  name: string
  description: string
  locationId: string | number
  activityId: string | number
  start: number
  end: number
  repetition: string
  price: number
  free: boolean
}

interface Args {
  first?: number
  after?: string
  searchKeyword?: string
  location?: string | number
  user?: string | number
  activity?: string | number
  savedBy?: string | number
}

export const getEvents = async (args: Args): Promise<EventType[]> | null => {
  const entries = Object.entries(args);

  const params = entries.map(entry => `${entry[0]}=${entry[1]}`);
  const queryParams = params.join("&");
  
  try {
    if (params.length > 0) {
      const res = await axios.get(`${EVENT_SERVICE_URL}?${queryParams}`);
      return res.data;
    } else {
      const res = await axios.get(EVENT_SERVICE_URL);
      return res.data;
    }
  } catch (error) {
    return null;
  }
};

export const getEvent = async (id: string | number): Promise<EventType> | null => {
  try {
    const res = await axios.get(`${EVENT_SERVICE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new InvalidIdError("Event");
  }
};

const eventSchema = object({
  name: string().required(),
  description: string(),
  locationId: string().required(),
  activityId: string().required(),
  start: date().required(),
  end: date().required(),
  repetition: string().required(),
  price: number().required(),
  free: bool().required()
});

export const createEvent = async (event: Event, authorizedUser: User): Promise<boolean> => {

  const location = await getLocation(event.locationId);
  const { name: locationName, latitude, longitude } = location;

  const activity = await getActivity(event.activityId);
  const { name: activityName } = activity;

  const data = await eventSchema.validate(event);

  const body = {
    ...data,
    latitude: latitude,
    longitude: longitude,
    createdById: authorizedUser.id,
    createdByName: authorizedUser.username,
    locationName: locationName,
    activityName: activityName,
  };

  try {
    const result = await axios.post(EVENT_SERVICE_URL, body);
    if (result.status === 201) {
      // handling join tables related to creating an event
      await locationActivityAdd(event);
      return result.data;
    }
  } catch (error) {
    throw new NameTakenError("event");
  }
};

const updateSchema = object({
  name: string(),
  description: string(),
  locationId: string(),
  activityId: string(),
  start: date(),
  end: date(),
  repetition: string(),
  price: number(),
  free: bool()
});

export const updateEvent = async (id: string | number, event: Event, authorizedUser: User): Promise<string> => {

  const data = await updateSchema.validate(event);
  const initialEvent = await getEvent(id);

  if (initialEvent.createdById !== authorizedUser.id) {
    throw new AuthenticationError("You must be the creator of the event in order to update it.");
  }

  let body: Partial<EventType> = { ...data };

  if (event.locationId) {
    const location = await getLocation(event.locationId);
    const { name: locationName } = location;
    body = { ...body, locationName };
  }

  if (event.activityId) {
    const activity = await getActivity(event.activityId);
    const { name: activityName } = activity;
    body = { ...body, activityName };
  }
  
  try {
    const result = await axios.put(`${EVENT_SERVICE_URL}/${id}`, body);
    if (result.status === 201) {
      // handles join table operations
      await locationActivityAdd(initialEvent, body.locationId, body.activityId);
      await locationActivityDelete(initialEvent);
      return result.data;
    } 
  } catch (error) {
    throw new NameTakenError("event");
  }

};

export const deleteEvent = async (id: string | number, authorizedUser: User): Promise<boolean> => {

  const event = await getEvent(id);

  if (event.createdById === authorizedUser.id) {
    try {
      const result = await axios.delete(`${EVENT_SERVICE_URL}/${id}`);
      if (result.status === 204) {
        // handles join table operations
        await locationActivityDelete(event);
      }
      return true;
    } catch (error) {
      throw new ApolloError("Could not delete the event");
    }
  }

  throw new AuthenticationError("You must be the creator of event in order to delete it.");

};

