import { LocationActivity } from "../models/LocationActivity";
import { LocationUser } from "../models/LocationUser";


export const addActivity = async (locationId: string | number, activityId: string | number) => {

  try {

    const alreadyFollow = await LocationActivity.query().where({
      locationId: locationId,
      activityId: activityId,
    });
  
    // Delete the follow
    if (alreadyFollow.length !== 0) {
      await LocationActivity.query()
        .where({
          locationId: locationId,
          activityId: activityId,
        })
        .delete();
  
      return true;
    }
  
    await LocationActivity.query().insertAndFetch({
      locationId: locationId,
      activityId: activityId,
    });
  
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const addUser = async (locationId: string | number, userId: string | number) => {

  try {

    const alreadyFollow = await LocationUser.query().where({
      locationId: locationId,
      userId: userId,
    });
  
    // Delete the follow
    if (alreadyFollow.length !== 0) {
      await LocationUser.query()
        .where({
          locationId: locationId,
          userId: userId,
        })
        .delete();
  
      return true;
    }
  
    await LocationUser.query().insertAndFetch({
      locationId: locationId,
      userId: userId,
    });
  
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};