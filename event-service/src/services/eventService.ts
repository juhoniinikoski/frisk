import EventClass, { Event } from "../models/Event";
import { v4 as uuid } from "uuid";

export const getEvents = async (locationId: string, sportId: string, userId: string, savedBy: string) =>  {
  
  let query = Event.query();

  if (locationId) {
    query = query.where({locationId: locationId});
  }

  if (sportId) {
    query = query.where({sportId: sportId});
  }

  if (userId) {
    query = query.where({createdById: userId});
  }

  if (savedBy) {
    query = query.withGraphJoined('savedBy(onlyUserId)')
      .modifiers({
        onlyUserId(builder) {
          void builder.select('userId');
        }
      })
      .where('userId', savedBy);
  }
  
  return await query;

};

export const getEvent = async (id: string | number) => {
  try {
    return await Event.query().findById(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getEventTest = async (id: string | number) => {
  try {
    return await Event.query().findById(id).withGraphFetched('savedBy');
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createEvent = async (event: Partial<EventClass>) => {

  try {
    
    await Event.query().insertAndFetch({
      ...event,
      id: uuid(),
    });

    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const updateEvent = async (id: string | number, event: Partial<EventClass>) => {

  try {
    await Event.query().patchAndFetchById(id, event);
    return true;
 
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const deleteEvent = async (id: string | number) => {

  try {

    const res = await Event.query().findById(id).delete();
    if (res === 0) {
      return false;
    }
    return true;

  } catch (error) {
    console.log(error);
    return false;
  }

};