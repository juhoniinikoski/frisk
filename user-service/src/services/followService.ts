import { UserEvent } from "../models/UserEvent";
import { UserLocation } from "../models/UserLocation";
import { UserActivity } from "../models/UserActivity";
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

export const saveActivity = async (userId: string | number, activityId: string | number) => {

  try {

    const alreadyFollow = await UserActivity.query().where({
      userId: userId,
      activityId: activityId,
    });
  
    // Delete the follow
    if (alreadyFollow.length !== 0) {
      await UserActivity.query()
        .where({
          userId: userId,
          activityId: activityId,
        })
        .delete();
  
      return true;
    }
  
    await UserActivity.query().insertAndFetch({
      userId: userId,
      activityId: activityId,
    });
  
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};