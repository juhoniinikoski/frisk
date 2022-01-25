import { LocationSport } from "../models/LocationSport";


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