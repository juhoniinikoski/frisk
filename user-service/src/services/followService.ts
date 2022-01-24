import { UserEvent } from "../models/UserEvent";
import { UserLocation } from "../models/UserLocation";
import { UserSport } from "../models/UserSport";
import { UserUser } from "../models/UserUser";

export const followUser = async (followerId: string | number, followingId: string | number) => {

  try {
    const alreadyFollow = await UserUser.query().where({
      followerId: followerId,
      followingId: followingId
    });
  
    // Delete the follow
    if (alreadyFollow.length !== 0) {
      await UserUser.query()
        .where({
          followerId: followerId,
          followingId: followingId
        })
        .delete();
  
      return true;
    }
  
    await UserUser.query().insertAndFetch({
      followerId: followerId,
      followingId: followingId
    });
  
    return true;
    
  } catch (error) {
    return false;
  }

};

export const saveEvent = async (userId: string | number, eventId: string | number) => {

  try {
    const alreadyFollow = await UserEvent.query().where({
      userId: userId,
      eventId: eventId,
    });
  
    // Delete the follow
    if (alreadyFollow.length !== 0) {
      await UserEvent.query()
        .where({
          userId: userId,
          eventId: eventId,
        })
        .delete();
  
      return true;
    }
  
    await UserEvent.query().insertAndFetch({
      userId: userId,
      eventId: eventId,
    });
  
    return true;

  } catch (error) {
    console.log(error);
    return false;
  }

};

export const saveLocation = async (userId: string | number, locationId: string | number) => {

  try {

    const alreadyFollow = await UserLocation.query().where({
      userId: userId,
      locationId: locationId,
    });
  
    // Delete the follow
    if (alreadyFollow.length !== 0) {
      await UserLocation.query()
        .where({
          userId: userId,
          locationId: locationId,
        })
        .delete();
  
      return true;
    }
  
    await UserLocation.query().insertAndFetch({
      userId: userId,
      locationId: locationId,
    });
  
    return true;

  } catch (error) {
    console.log(error);
    return false;
  }

};

export const saveSport = async (userId: string | number, sportId: string | number) => {

  try {

    const alreadyFollow = await UserSport.query().where({
      userId: userId,
      sportId: sportId,
    });
  
    // Delete the follow
    if (alreadyFollow.length !== 0) {
      await UserSport.query()
        .where({
          userId: userId,
          sportId: sportId,
        })
        .delete();
  
      return true;
    }
  
    await UserSport.query().insertAndFetch({
      userId: userId,
      sportId: sportId,
    });
  
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};