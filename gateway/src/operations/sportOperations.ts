import axios from "axios";
import { SPORT_SERVICE_URL } from "../utils/config";
import { InvalidIdError } from "./errors";

interface Args {
  first?: number
  after?: string
  searchKeyword?: string
  location?: string | number
  savedBy?: string | number
}

export const getSports = async (args: Args) => {
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

export const getSport = async (id: string | number) => {
  try {
    const res = await axios.get(`${SPORT_SERVICE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new InvalidIdError("Sport");
  }
};
