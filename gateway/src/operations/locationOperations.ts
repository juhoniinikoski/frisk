import axios from "axios";
import { EVENT_SERVICE_URL, LOCATION_SERVICE_URL } from "../utils/config";
import { InvalidIdError, NameTakenError } from "./errors";
import { Location as LocationType, User } from "../entities";
import { object, string } from "yup";
import { ApolloError, AuthenticationError } from "apollo-server";
import { getEvents } from "./eventOperations";

/* eslint-disable @typescript-eslint/no-unsafe-return */

interface Args {
  first?: number
  after?: string
  searchKeyword?: string
  activity?: string | number
  savedBy?: string | number
}

export const getLocations = async (args: Args): Promise<LocationType[]> | null => {
  const entries = Object.entries(args);

  const params = entries.map(entry => `${entry[0]}=${entry[1]}`);
  const queryParams = params.join("&");
  
  try {
    if (params.length > 0) {
      const res = await axios.get(`${LOCATION_SERVICE_URL}?${queryParams}`);
      return res.data;
    } else {
      const res = await axios.get(LOCATION_SERVICE_URL);
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLocation = async (id: string | number): Promise<LocationType> | null => {
  try {
    const res = await axios.get(`${LOCATION_SERVICE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new InvalidIdError("Location");
  }
};

const locationSchema = object({
  name: string().required(),
  description: string(),
  street: string().required(),
  zipcode: string(),
  city: string().required(),
  country: string()
});

export const createLocation = async (location: Partial<LocationType>, authorizedUser: User): Promise<string> => {

  const data = await locationSchema.validate(location);

  const body = {
    ...data,
    createdById: authorizedUser.id
  };

  try {
    const result = await axios.post(LOCATION_SERVICE_URL, body);
    if (result.status === 201) {
      return result.data;
    }
  } catch (error) {
    throw new NameTakenError("Location");
  }

};

const updateSchema = object({
  name: string(),
  description: string(),
  street: string(),
  zipcode: string(),
  city: string(),
  country: string()
});


export const updateLocation = async (id: string | number, location: Partial<LocationType>, authorizedUser: User): Promise<string> => {

  const data = await updateSchema.validate(location);
  const initialLocation = await getLocation(id);

  if (initialLocation.createdById !== authorizedUser.id) {
    console.log(initialLocation.createdById);
    throw new AuthenticationError("You must be the creator of the location in order to update it.");
  }
  
  try {
    const result = await axios.put(`${LOCATION_SERVICE_URL}/${id}`, data);
    if (result.status === 201) {
      // if name is changed, update name of all events of this location
      if (data.name) {
        await axios.put(`${EVENT_SERVICE_URL}?location=${id}`, { locationName: data.name });
      }
      return result.data;
    }
  } catch (error) {
    throw new NameTakenError("location");
  }

};

export const deleteLocation = async (id: string | number, authorizedUser: User) => {

  // check if location wanted to delete really exists
  const location = await getLocation(id);

  if (location.createdById !== authorizedUser.id) {
    throw new AuthenticationError("You must be the creator of the location in order to delete it.");
  }

  // location can be deleted only if there is no events
  const result = await getEvents({ location: id });

  if (result.length === 0) {
    try {
      const result = await axios.delete(`${LOCATION_SERVICE_URL}/${id}`);
      if (result.status === 204) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  throw new ApolloError("Could not delete a location as there are events with that specific location");

};
