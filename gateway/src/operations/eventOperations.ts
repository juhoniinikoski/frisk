import axios from "axios";
import { InvalidIdError } from "./errors";

/* eslint-disable @typescript-eslint/no-unsafe-return */

// interface Event {
//   name: string
//   description: string
//   locationId: string | number
//   sportId: string | number
//   start: number
//   end: number
// }

// const authorizedUser = {
//   username: "juhoniinikoski",
//   id: "bbe42984-051b-4a01-b45d-b8d29c32200c"
// };

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
      const res = await axios.get(`http://localhost:9010/events?${queryParams}`);
      return res.data;
    } else {
      const res = await axios.get("http://localhost:9010/events");
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getEvent = async (id: string | number) => {
  try {
    const res = await axios.get(`http://localhost:9010/events/${id}`);
    return res.data;
  } catch (error) {
    throw new InvalidIdError("Event");
  }
};

// export const createEvent = async (event: Event) => {

//   const location = await fetch(`http://localhost:9020/locations/${event.locationId}`);
//   if (location.status === 404) {
//     throw new InvalidIdError("Location")
//   }

//   const { name: locationName } = await location.json();
  
//   const sport = await fetch(`http://localhost:9040/sports/${event.sportId}`);
//   if (sport.status === 404) {
//     throw new InvalidIdError("Sport")
//   }

//   const { name: sportName } = await sport.json();

//   const body = {
//     id: uuid(),
//     name: event.name,
//     description: event.description,
//     createdById: authorizedUser.id,
//     createdByName: authorizedUser.username,
//     locationId: event.locationId,
//     locationName: locationName,
//     sportId: event.sportId,
//     sportName: sportName,
//   };

//   console.log(body)

//   return true;
// }