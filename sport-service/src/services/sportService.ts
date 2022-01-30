import SportClass, { Sport } from "../models/Sport";
import { v4 as uuid } from 'uuid';

export const getSports = async (locationId: string) => {
  
  let query = Sport.query();

  if (locationId) {
    query = Sport.query().withGraphJoined('locations(onlyLocationId)')
      .modifiers({
        onlyLocationId(builder) {
          void builder.select('locationId');
        }
      })
      .where('locationId', locationId);
  };

  return await query;
};

export const getSport = async (id: string | number) => {

  try {
    return await Sport.query().findById(id).withGraphFetched('locations');
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const createSport = async (sport: Partial<SportClass>) => {

  try {

    const { name } = sport;

    const existingSport = await Sport.query().where('name', name);
    if (existingSport.length !== 0) {
      return false;
    }

    await Sport.query().insertAndFetch({
      ...sport,
      id: uuid(),
    });

    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const updateSport = async (id: string | number, sport: Partial<SportClass>) => {

  try {

    const { name } = sport;

    const existingSport = await Sport.query()
      .where('name', name);

    if (existingSport.length !== 0) {
      return false;
    }

    await Sport.query().patchAndFetchById(id, sport);
    return true;
 
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const deleteSport = async (id: string | number) => {

  try {

    const res = await Sport.query().findById(id).delete();
    if (res === 0) {
      return false;
    }
    return true;

  } catch (error) {
    console.log(error);
    return false;
  }

};