import axios from "axios";
import { EVENT_SERVICE_URL, SPORT_SERVICE_URL } from "../utils/config";
import { InvalidIdError, NameTakenError } from "./errors";
import { Sport as SportType, User } from "../entities";
import { object, string } from "yup";
import { ApolloError, AuthenticationError } from "apollo-server";
import { getEvents } from "./eventOperations";

/* eslint-disable @typescript-eslint/no-unsafe-return */

interface Args {
  first?: number
  after?: string
  searchKeyword?: string
  location?: string | number
  savedBy?: string | number
}

export const getSports = async (args: Args): Promise<SportType[]> | null => {
  const entries = Object.entries(args);

  const params = entries.map(entry => `${entry[0]}=${entry[1]}`);
  const queryParams = params.join("&");
  
  try {
    if (params.length > 0) {
      const res = await axios.get(`${SPORT_SERVICE_URL}?${queryParams}`);
      return res.data;
    } else {
      const res = await axios.get(SPORT_SERVICE_URL);
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSport = async (id: string | number): Promise<SportType> | null => {
  try {
    const res = await axios.get(`${SPORT_SERVICE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new InvalidIdError("Sport");
  }
};

const sportSchema = object({
  name: string().required()
});

export const createSport = async (sport: Partial<SportType>, authorizedUser: User): Promise<string | boolean> => {

  const data = await sportSchema.validate(sport);

  const body = {
    ...data,
    createdById: authorizedUser.id
  };

  try {
    const result = await axios.post(SPORT_SERVICE_URL, body);
    if (result.status === 201) {
      return result.data;
    }
  } catch (error) {
    throw new NameTakenError("sport");
  }
  
  return false;
};

const updateSchema = object({
  name: string()
});

export const updateSport = async (id: string | number, sport: Partial<SportType>, authorizedUser: User): Promise<string> => {

  const data = await updateSchema.validate(sport);
  const initialSport = await getSport(id);

  if (initialSport.createdById !== authorizedUser.id) {
    throw new AuthenticationError("You must be the creator of the sport in order to update it.");
  }
  
  try {
    const result = await axios.put(`${SPORT_SERVICE_URL}/${id}`, data);
    if (result.status === 201) {
      // if name is changed, update name of all events of this location
      if (data.name) {
        await axios.put(`${EVENT_SERVICE_URL}?sport=${id}`, { sportName: data.name });
      }
      return result.data;
    }
  } catch (error) {
    console.log(error);
    throw new NameTakenError("sport");
  }
  
};

export const deleteSport = async (id: string | number, authorizedUser: User) => {

  // check if sport wanted to delete really exists
  const sport = await getSport(id);

  if (sport.createdById !== authorizedUser.id) {
    throw new AuthenticationError("You must be the creator of the sport in order to delete it.");
  }

  // sport can be deleted only if there is no events with that sport
  const result = await getEvents({ sport: id });

  if (result.length === 0) {
    try {
      const result = await axios.delete(`${SPORT_SERVICE_URL}/${id}`);
      if (result.status === 204) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  throw new ApolloError("Could not delete a sport as there are events with that specific sport");

};
