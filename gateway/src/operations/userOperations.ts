import axios from "axios";
import { InvalidIdError } from "./errors";

interface Args {
  first?: number
  after?: string
  searchKeyword?: string
}

export const getUsers = async (args: Args) => {
  const entries = Object.entries(args);

  const params = entries.map(entry => `${entry[0]}=${entry[1]}`);
  const queryParams = params.join("&");
  
  try {
    if (params.length > 0) {
      const res = await axios.get(`http://localhost:9030/users?${queryParams}`);
      return res.data;
    } else {
      const res = await axios.get("http://localhost:9030/users");
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUser = async (id: string | number) => {
  try {
    const res = await axios.get(`http://localhost:9030/users/${id}`);
    return res.data;
  } catch (error) {
    throw new InvalidIdError("User");
  }
};