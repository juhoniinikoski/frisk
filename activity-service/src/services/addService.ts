import { ActivityLocation } from "../models/ActivityLocation";
import { ActivityUser } from "../models/ActivityUser";


export const addLocation = async (locationId: string | number, activityId: string | number) => {

  try {

    const alreadyAdded = await ActivityLocation.query().where({
      locationId: locationId,
      activityId: activityId,
    });
  
    // Delete the follow
    if (alreadyAdded.length !== 0) {
      await ActivityLocation.query()
        .where({
          locationId: locationId,
          activityId: activityId,
        })
        .delete();
  
      return true;
    }
  
    await ActivityLocation.query().insertAndFetch({
      locationId: locationId,
      activityId: activityId,
    });
  
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const addUser = async (userId: string | number, activityId: string | number) => {

  try {

    const alreadyAdded = await ActivityUser.query().where({
      userId: userId,
      activityId: activityId,
    });
  
    // Delete the follow
    if (alreadyAdded.length !== 0) {
      await ActivityUser.query()
        .where({
          userId: userId,
          activityId: activityId,
        })
        .delete();
  
      return true;
    }
  
    await ActivityUser.query().insertAndFetch({
      userId: userId,
      activityId: activityId,
    });
  
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};