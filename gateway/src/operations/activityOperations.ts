import axios from "axios";
import { EVENT_SERVICE_URL, ACTIVITY_SERVICE_URL } from "../utils/config";
import { InvalidIdError, NameTakenError } from "./errors";
import { Activity as ActivityType, User } from "../entities";
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

export const getActivities = async (args: Args): Promise<ActivityType[]> | null => {
  const entries = Object.entries(args);

  const params = entries.map(entry => `${entry[0]}=${entry[1]}`);
  const queryParams = params.join("&");
  
  try {
    if (params.length > 0) {
      const res = await axios.get(`${ACTIVITY_SERVICE_URL}?${queryParams}`);
      return res.data;
    } else {
      const res = await axios.get(ACTIVITY_SERVICE_URL);
      return res.data;
    }
  } catch (error) {
    return null;
  }
};

export const getActivity = async (id: string | number): Promise<ActivityType> | null => {
  try {
    const res = await axios.get(`${ACTIVITY_SERVICE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new InvalidIdError("Activity");
  }
};

const activitySchema = object({
  name: string().required()
});

export const createActivity = async (activity: Partial<ActivityType>, authorizedUser: User): Promise<string | boolean> => {

  const data = await activitySchema.validate(activity);

  const body = {
    ...data,
    createdById: authorizedUser.id
  };

  try {
    const result = await axios.post(ACTIVITY_SERVICE_URL, body);
    if (result.status === 201) {
      return result.data;
    }
  } catch (error) {
    throw new NameTakenError("activity");
  }
  
  return false;
};

const updateSchema = object({
  name: string()
});

export const updateActivity = async (id: string | number, activity: Partial<ActivityType>, authorizedUser: User): Promise<string> => {

  const data = await updateSchema.validate(activity);
  const initialActivity = await getActivity(id);

  if (initialActivity.createdById !== authorizedUser.id) {
    throw new AuthenticationError("You must be the creator of the activity in order to update it.");
  }
  
  try {
    const result = await axios.put(`${ACTIVITY_SERVICE_URL}/${id}`, data);
    if (result.status === 201) {
      // if name is changed, update name of all events of this location
      if (data.name) {
        await axios.put(`${EVENT_SERVICE_URL}?activity=${id}`, { activityName: data.name });
      }
      return result.data;
    }
  } catch (error) {
    throw new NameTakenError("activity");
  }
  
};

export const deleteActivity = async (id: string | number, authorizedUser: User) => {

  // check if activity wanted to delete really exists
  const activity = await getActivity(id);

  if (activity.createdById !== authorizedUser.id) {
    throw new AuthenticationError("You must be the creator of the activity in order to delete it.");
  }

  // activity can be deleted only if there is no events with that activity
  const result = await getEvents({ activity: id });

  if (result.length === 0) {
    try {
      const result = await axios.delete(`${ACTIVITY_SERVICE_URL}/${id}`);
      if (result.status === 204) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  throw new ApolloError("Could not delete a activity as there are events with that specific activity");

};
