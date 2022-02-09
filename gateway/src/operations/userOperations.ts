import axios from "axios";
import { InvalidIdError } from "./errors";
import { User as UserType } from "../entities";
import { object, string } from "yup";
import { USER_SERVICE_URL } from "../utils/config";
import { ApolloError, AuthenticationError } from "apollo-server";

/* eslint-disable @typescript-eslint/no-unsafe-return */

interface Args {
  first?: number
  after?: string
  searchKeyword?: string
}

export const getUsers = async (args: Args): Promise<UserType[]> | null => {
  const entries = Object.entries(args);

  const params = entries.map(entry => `${entry[0]}=${entry[1]}`);
  const queryParams = params.join("&");
  
  try {
    if (params.length > 0) {
      const res = await axios.get(`${USER_SERVICE_URL}?${queryParams}`);
      return res.data;
    } else {
      const res = await axios.get(`${USER_SERVICE_URL}`);
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUser = async (id: string | number): Promise<UserType> | null => {
  try {
    const res = await axios.get(`${USER_SERVICE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new InvalidIdError("User");
  }
};

const userSchema = object({
  username: string().required(),
  email: string().required(),
  password: string().required()
});

export const createUser = async (user: Partial<UserType>) => {

  const data = await userSchema.validate(location);

  try {
    const result = await axios.post(USER_SERVICE_URL, data);
    if (result.status === 201) {
      return result.data;
    }
  } catch (error) {
    throw new ApolloError("Couldn't create a new user.");
  }
  
  return false;
};

const updateSchema = object({
  username: string(),
  email: string()
});

export const updateUser = async (id: string | number, user: Partial<UserType>, authorizedUser: UserType) => {

  const data = await updateSchema.validate(user);

  // should also change creator names of all events where this user is creator
  
  if (authorizedUser.id !== id) {
    throw new AuthenticationError("You can only update your data as an authenticated user.");
  }
  
  try {
    const result = await axios.put(`${USER_SERVICE_URL}/${id}`, data);
    if (result.status === 201) {
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }

  throw new ApolloError("Could not update the user.");
  
};


export const deleteUser = async (id: string | number, authorizedUser: UserType) => {

  // should also remove all upcoming events created by user

  if (authorizedUser.id === id) {
    try {
      const result = await axios.delete(`${USER_SERVICE_URL}/${id}`);
      if (result.status === 204) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  throw new ApolloError("Could not delete the user.");

};