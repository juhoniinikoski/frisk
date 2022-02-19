import LocationClass, { Location } from "../models/Location";
import { v4 as uuid } from "uuid";

export const getLocations = async (activityId: string, savedBy: string, orderBy?: string) => {

  const order = orderBy ? orderBy : 'name';
  
  let query = Location.query();

  if (activityId) {
    query = query.withGraphJoined('activities(onlyActivityId)')
      .modifiers({
        onlyActivityId(builder) {
          void builder.select('activityId');
        }
      })
      .where('activityId', activityId);
  };
  
  if (savedBy) {
    query = query.withGraphJoined('savedBy(onlyUserId)')
      .modifiers({
        onlyUserId(builder) {
          void builder.select('userId');
        }
      })
      .where('userId', savedBy);
  };

  return await query.orderBy(order);
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
    return await Location.query().findById(id).withGraphFetched('[activities, savedBy]');
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

    const id = uuid();

    await Location.query().insertAndFetch({
      ...location,
      id: id,
    });

    return id;
    
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