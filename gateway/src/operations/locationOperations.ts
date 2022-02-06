import { ApolloError } from "apollo-server";
import axios from "axios";
import { LOCATION_SERVICE_URL } from "../utils/config";
import { InvalidIdError } from "./errors";

/* eslint-disable @typescript-eslint/no-unsafe-return */

interface Args {
  first?: number
  after?: string
  searchKeyword?: string
  sport?: string | number
  savedBy?: string | number
}

export const getLocations = async (args: Args) => {
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

export const getLocation = async (id: string | number) => {
  try {
    const res = await axios.get(`${LOCATION_SERVICE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new InvalidIdError("Location");
  }
};
