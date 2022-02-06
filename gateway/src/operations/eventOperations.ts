import axios from "axios";
import { DefectiveDataError, InvalidIdError } from "./errors";
import { v4 as uuid } from "uuid";
import { getLocation } from "./locationOperations";
import { getSport } from "./sportOperations";
import { EVENT_SERVICE_URL } from "../utils/config";

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

export const createEvent = async (event: Event) => {

  let values = Object.values(event);
  // removes description from checking as it's not mandatory
  values.splice(1, 1);
  
  // check that all values are included and none of the values is empty
  if (values.length !== 8) {
    throw new DefectiveDataError("createEvent");
  } else if (values.filter(value => value === "" || null).length !== 0) {
    throw new DefectiveDataError("createEvent");
  };

  const location = await getLocation(event.locationId);
  const { name: locationName } = location;

  const sport = await getSport(event.sportId);
  const { name: sportName } = sport;

  const body = {
    id: uuid(),
    name: event.name,
    description: event.description,
    createdById: authorizedUser.id,
    createdByName: authorizedUser.username,
    locationId: event.locationId,
    locationName: locationName,
    sportId: event.sportId,
    sportName: sportName,
    start: event.start,
    free: event.free,
    end: event.end,
    repetition: event.repetition,
    price: event.price
  };

  const res = await axios.post(EVENT_SERVICE_URL, body);
  if (res.status === 201) {
    return true;
  }
  
  return false;
};

