import { SportLocation } from "../models/SportLocation";
import { SportUser } from "../models/SportUser";


export const addLocation = async (locationId: string | number, sportId: string | number) => {

  try {

    const alreadyAdded = await SportLocation.query().where({
      locationId: locationId,
      sportId: sportId,
    });
  
    // Delete the follow
    if (alreadyAdded.length !== 0) {
      await SportLocation.query()
        .where({
          locationId: locationId,
          sportId: sportId,
        })
        .delete();
  
      return true;
    }
  
    await SportLocation.query().insertAndFetch({
      locationId: locationId,
      sportId: sportId,
    });
  
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const addUser = async (userId: string | number, sportId: string | number) => {

  try {

    const alreadyAdded = await SportUser.query().where({
      userId: userId,
      sportId: sportId,
    });
  
    // Delete the follow
    if (alreadyAdded.length !== 0) {
      await SportUser.query()
        .where({
          userId: userId,
          sportId: sportId,
        })
        .delete();
  
      return true;
    }
  
    await SportUser.query().insertAndFetch({
      userId: userId,
      sportId: sportId,
    });
  
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};