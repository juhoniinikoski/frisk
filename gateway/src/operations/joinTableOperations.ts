import axios from "axios";
import { LOCATION_SERVICE_URL, SPORT_SERVICE_URL } from "../utils/config";
import { Sport, Event } from "../entities";
import { getSports } from "./sportOperations";
import { getEvents } from "./eventOperations";

/* eslint-disable @typescript-eslint/no-unsafe-return */

export const locationSportAdd = async (event: Partial<Event>): Promise<void> => {

  // find if location of the event is already added to sports's locations
  const sportsByLocation: Sport[] = await getSports({ location: event.locationId })
    .then((sports: Sport[]) => sports.filter(sport => sport.id === event.sportId));

  if (sportsByLocation.length === 0) {
    const body = { sportId: event.sportId };
    await axios.post(`${LOCATION_SERVICE_URL}/${event.locationId}/sports`, body);
    const body2 = { locationId: event.locationId };
    await axios.post(`${SPORT_SERVICE_URL}/${event.sportId}/locations`, body2);
  }

};

export const locationSportDelete = async (event: Partial<Event>): Promise<void> => {

  // find if deleted event was only event with that sport in event's location
  const locationsBySport: Event[] = await getEvents({ location: event.locationId, sport: event.sportId });
  if (locationsBySport.length === 0) {
    const body = { sportId: event.sportId };
    await axios.post(`${LOCATION_SERVICE_URL}/${event.locationId}/sports`, body);
    const body2 = { locationId: event.locationId };
    await axios.post(`${SPORT_SERVICE_URL}/${event.sportId}/locations`, body2);
  }

};