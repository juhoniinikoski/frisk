import EventClass, { Event } from "../models/Event"
import { v4 as uuid } from "uuid"

export const getEvents = async () => await Event.query();

export const getEvent = async (id: string | number) => {
  try {
    return await Event.query().findById(id);
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

}

export const updateEvent = async (id: string | number, event: Partial<EventClass>) => {

  try {
    await Event.query().patchAndFetchById(id, event);
    return true;
 
  } catch (error) {
    console.log(error);
    return false;
  }

}

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