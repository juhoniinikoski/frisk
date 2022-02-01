import { EventUser } from "../models/EventUser";


export const addUser = async (userId: string | number, eventId: string | number) => {

  try {

    const alreadyAdded = await EventUser.query().where({
      userId: userId,
      eventId: eventId,
    });
  
    // Delete the follow
    if (alreadyAdded.length !== 0) {
      await EventUser.query()
        .where({
          userId: userId,
          eventId: eventId,
        })
        .delete();
  
      return true;
    }
  
    await EventUser.query().insertAndFetch({
      userId: userId,
      eventId: eventId,
    });
  
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};