import axios from "axios";
import { InvalidIdError } from "./errors";
import { v4 as uuid } from "uuid";
import { getLocation } from "./locationOperations";
import { getSport } from "./sportOperations";
import { EVENT_SERVICE_URL } from "../utils/config";
import { object, string, number, date, bool } from 'yup';

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

export const getEvents = async (args: Args) => {
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

export const getEvent = async (id: string | number) => {
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

export const createEvent = async (event: Event) => {

  // create event also to join tables

  const data = await eventSchema.validate(event);

  const location = await getLocation(event.locationId);
  const { name: locationName } = location;

  const sport = await getSport(event.sportId);
  const { name: sportName } = sport;

  const body = {
    ...data,
    id: uuid(),
    createdById: authorizedUser.id,
    createdByName: authorizedUser.username,
    locationName: locationName,
    sportName: sportName,
  };

  const res = await axios.post(EVENT_SERVICE_URL, body);
  if (res.status === 201) {
    return true;
  }
  
  return false;
};

export const deleteEvent = async (id: string | number) => {

  // handle removal of also from all possible join tables

  try {
    await axios.delete(`${EVENT_SERVICE_URL}/${id}`);
    return true;
  } catch (error) {
    throw new InvalidIdError("Event")
  }
}

