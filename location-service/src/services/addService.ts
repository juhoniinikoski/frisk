import { LocationSport } from "../models/LocationSport";
import { LocationUser } from "../models/LocationUser";


export const addSport = async (locationId: string | number, sportId: string | number) => {

  try {

    const alreadyFollow = await LocationSport.query().where({
      locationId: locationId,
      sportId: sportId,
    });
  
    // Delete the follow
    if (alreadyFollow.length !== 0) {
      await LocationSport.query()
        .where({
          locationId: locationId,
          sportId: sportId,
        })
        .delete();
  
      return true;
    }
  
    await LocationSport.query().insertAndFetch({
      locationId: locationId,
      sportId: sportId,
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