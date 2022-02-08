import axios from "axios";
import { LOCATION_SERVICE_URL, SPORT_SERVICE_URL } from "../utils/config";
import { Sport, Event } from "../entities";
import { getSports } from "./sportOperations";
import { getEvents } from "./eventOperations";

/* eslint-disable @typescript-eslint/no-unsafe-return */

type ID = string | number

export const locationSportAdd = async (event: Partial<Event>, locationUpdate?: ID, sportUpdate?: ID): Promise<void> => {

  const sportId = sportUpdate ? sportUpdate : event.sportId;
  const locationId = locationUpdate ? locationUpdate : event.locationId;

  // find if location of the event is already added to sports's locations
  const sportsByLocation: Sport[] = await getSports({ location: locationId })
    .then((sports: Sport[]) => sports.filter(sport => sport.id === sportId));

  if (sportsByLocation.length === 0) {
    const body = { sportId: sportId };
    await axios.post(`${LOCATION_SERVICE_URL}/${locationId}/sports`, body);
    const body2 = { locationId: locationId };
    await axios.post(`${SPORT_SERVICE_URL}/${sportId}/locations`, body2);
  }

};

export const locationSportDelete = async (event: Partial<Event>, locationUpdate?: ID, sportUpdate?: ID): Promise<void> => {

  const sportId = event.sportId;
  const locationId = event.locationId;

  // find if deleted event was only event with that sport in event's location
  const locationsBySport: Event[] = await getEvents({ location: locationId, sport: sportId });
  if (locationsBySport.length === 0) {
    const body = { sportId: sportId };
    await axios.post(`${LOCATION_SERVICE_URL}/${locationId}/sports`, body);
    const body2 = { locationId: locationId };
    await axios.post(`${SPORT_SERVICE_URL}/${sportId}/locations`, body2);
  }

};