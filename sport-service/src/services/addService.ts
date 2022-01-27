import { SportLocation } from "../models/SportLocation";


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