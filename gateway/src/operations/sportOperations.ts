import axios from "axios";
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
      const res = await axios.get(`http://localhost:9040/sports?${queryParams}`);
      return res.data;
    } else {
      const res = await axios.get("http://localhost:9040/sports");
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSport = async (id: string | number) => {
  try {
    const res = await axios.get(`http://localhost:9040/sports/${id}`);
    return res.data;
  } catch (error) {
    throw new InvalidIdError("Sport");
  }
};
