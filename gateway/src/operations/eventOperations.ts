import axios from "axios";
import { InvalidIdError, NameTakenError } from "./errors";
import { Event as EventType } from "../entities";
import { getLocation } from "./locationOperations";
import { getSport } from "./sportOperations";
import { EVENT_SERVICE_URL } from "../utils/config";
import { object, string, number, date, bool } from 'yup';
import { locationSportAdd, locationSportDelete } from "./joinTableOperations";
import { ApolloError } from "apollo-server";

/* eslint-disable @typescript-eslint/no-unsafe-return */

interface Event {
  name: string
  description: string
  locationId: string | number
  sportId: string | number
  start: number
  end: number
  repetition: string
  price: number
  free: boolean
}

const authorizedUser = {
  username: "juhoniinikoski",
  id: "bbe42984-051b-4a01-b45d-b8d29c32200c"
};

interface Args {
  first?: number
  after?: string
  searchKeyword?: string
  location?: string | number
  user?: string | number
  sport?: string | number
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
    console.log(error);
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
  sportId: string().required(),
  start: date().required(),
  end: date().required(),
  repetition: string().required(),
  price: number().required(),
  free: bool().required()
});

export const createEvent = async (event: Event): Promise<boolean> => {

  const location = await getLocation(event.locationId);
  const { name: locationName } = location;

  const sport = await getSport(event.sportId);
  const { name: sportName } = sport;

  const data = await eventSchema.validate(event);

  const body = {
    ...data,
    createdById: authorizedUser.id,
    createdByName: authorizedUser.username,
    locationName: locationName,
    sportName: sportName,
  };

  try {
    const result = await axios.post(EVENT_SERVICE_URL, body);
    if (result.status === 201) {
      // handling join tables related to creating an event
      await locationSportAdd(event);
      return result.data;
    }
  } catch (error) {
    throw new NameTakenError("event");
  }
  
  return false;
};

const updateSchema = object({
  name: string(),
  description: string(),
  locationId: string(),
  sportId: string(),
  start: date(),
  end: date(),
  repetition: string(),
  price: number(),
  free: bool()
});

export const updateEvent = async (id: string | number, event: Event) => {

  const data = await updateSchema.validate(event);
  const initialEvent = await getEvent(id);

  let body: Partial<EventType> = { ...data };

  if (event.locationId) {
    const location = await getLocation(event.locationId);
    const { name: locationName } = location;
    body = { ...body, locationName };
  }

  if (event.sportId) {
    const sport = await getSport(event.sportId);
    const { name: sportName } = sport;
    body = { ...body, sportName }
  }
  
  try {
    const result = await axios.put(`${EVENT_SERVICE_URL}/${id}`, body);
    if (result.status === 201) {
      // handles join table operations
      await locationSportAdd(initialEvent, body.locationId, body.sportId);
      await locationSportDelete(initialEvent, body.locationId, body.sportId);
      return result.data;
    } 
  } catch (error) {
    console.log(error);
    throw new NameTakenError("event");
  }

};

export const deleteEvent = async (id: string | number): Promise<boolean> => {

  const event = await getEvent(id);

  try {
    const result = await axios.delete(`${EVENT_SERVICE_URL}/${id}`);
    if (result.status === 204) {
      // handles join table operations
      await locationSportDelete(event);
    }
    return true;
  } catch (error) {
    console.log(error);
  }

  return true;

};

