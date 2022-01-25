import LocationClass, { Location } from "../models/Location";
import { v4 as uuid } from "uuid";

export const getLocations = async () => await Location.query();

export const getLocation = async (id: string | number) => {

  try {
    return await Location.query().findById(id).withGraphFetched('sports');
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