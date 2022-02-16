import axios from "axios";
import { LOCATION_SERVICE_URL, ACTIVITY_SERVICE_URL } from "../utils/config";
import { Activity, Event } from "../entities";
import { getActivities } from "./activityOperations";
import { getEvents } from "./eventOperations";

/* eslint-disable @typescript-eslint/no-unsafe-return */

type ID = string | number;

export const locationActivityAdd = async (event: Partial<Event>, locationUpdate?: ID, activityUpdate?: ID): Promise<void> => {

  const activityId = activityUpdate ? activityUpdate : event.activityId;
  const locationId = locationUpdate ? locationUpdate : event.locationId;

  // find if location of the event is already added to activities's locations
  const activitiesByLocation: Activity[] = await getActivities({ location: locationId })
    .then((activities: Activity[]) => activities.filter(activity => activity.id === activityId));

  if (activitiesByLocation.length === 0) {
    const body = { activityId: activityId };
    await axios.post(`${LOCATION_SERVICE_URL}/${locationId}/activities`, body);
    const body2 = { locationId: locationId };
    await axios.post(`${ACTIVITY_SERVICE_URL}/${activityId}/locations`, body2);
  }

};

export const locationActivityDelete = async (event: Partial<Event>): Promise<void> => {

  const activityId = event.activityId;
  const locationId = event.locationId;

  // find if deleted event was only event with that activity in event's location
  const locationsByActivity: Event[] = await getEvents({ location: locationId, activity: activityId });
  if (locationsByActivity.length === 0) {
    const body = { activityId: activityId };
    await axios.post(`${LOCATION_SERVICE_URL}/${locationId}/activities`, body);
    const body2 = { locationId: locationId };
    await axios.post(`${ACTIVITY_SERVICE_URL}/${activityId}/locations`, body2);
  }

};