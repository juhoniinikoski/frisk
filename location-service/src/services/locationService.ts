import LocationClass, { Location } from "../models/Location";
import { v4 as uuid } from "uuid";

export const getLocations = async (sportId: string, savedBy: string) => {
  
  let query = Location.query();

  if (sportId) {
    query = Location.query().withGraphJoined('sports(onlySportId)')
      .modifiers({
        onlySportId(builder) {
          void builder.select('sportId');
        }
      })
      .where('sportId', sportId);
  };
  
  if (savedBy) {
    query = Location.query().withGraphJoined('savedBy(onlyUserId)')
      .modifiers({
        onlyUserId(builder) {
          void builder.select('userId');
        }
      })
      .where('userId', savedBy);
  };

  return await query;
}

export const getLocation = async (id: string | number) => {

  try {
    return await Location.query().findById(id);
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const getLocationTest = async (id: string | number) => {

  try {
    return await Location.query().findById(id).withGraphFetched('[sports, savedBy]');
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const createLocation = async (location: Partial<LocationClass>) => {

  try {

    const { name } = location;

    const existingLocation = await Location.query().where('name', name);
    if (existingLocation.length !== 0) {
      return false;
    }

    await Location.query().insertAndFetch({
      ...location,
      id: uuid(),
    });

    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const updateLocation = async (id: string | number, location: Partial<LocationClass>) => {

  try {

    const { name } = location;

    const existingLocation = await Location.query()
      .where('name', name);

    if (existingLocation.length !== 0) {
      return false;
    }

    await Location.query().patchAndFetchById(id, location);
    return true;
 
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const deleteLocation = async (id: string | number) => {

  try {

    const res = await Location.query().findById(id).delete();
    if (res === 0) {
      return false;
    }
    return true;

  } catch (error) {
    console.log(error);
    return false;
  }

};