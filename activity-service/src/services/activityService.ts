import ActivityClass, { Activity } from "../models/Activity";
import { v4 as uuid } from 'uuid';

export const getActivities = async (locationId: string, savedById: string, orderBy?: string) => {

  const order = orderBy ? orderBy : 'name';
  
  let query = Activity.query();

  if (locationId) {
    query = query.withGraphJoined('locations(onlyLocationId)')
      .modifiers({
        onlyLocationId(builder) {
          void builder.select('locationId');
        }
      })
      .where('locationId', locationId);
  };
  
  if (savedById) {
    query = query.withGraphJoined('users(onlyUserId)')
      .modifiers({
        onlyUserId(builder) {
          void builder.select('userId');
        }
      })
      .where('userId', savedById);
  };

  return await query.orderBy(order);
};

export const getActivity = async (id: string | number) => {

  try {
    return await Activity.query().findById(id);
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const getActivityTest = async (id: string | number) => {

  try {
    return await Activity.query().findById(id).withGraphFetched('[locations, users]');
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const createActivity = async (activity: Partial<ActivityClass>) => {

  try {

    const { name } = activity;

    const existingActivity = await Activity.query().where('name', name);
    if (existingActivity.length !== 0) {
      return false;
    }

    const id = uuid();

    await Activity.query().insertAndFetch({
      ...activity,
      id: id,
    });

    return id;
    
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const updateActivity = async (id: string | number, activity: Partial<ActivityClass>) => {

  try {

    const { name } = activity;

    const existingActivity = await Activity.query()
      .where('name', name);

    if (existingActivity.length !== 0) {
      return false;
    }

    await Activity.query().patchAndFetchById(id, activity);
    return true;
 
  } catch (error) {
    console.log(error);
    return false;
  }

};

export const deleteActivity = async (id: string | number) => {

  try {

    const res = await Activity.query().findById(id).delete();
    if (res === 0) {
      return false;
    }
    return true;

  } catch (error) {
    console.log(error);
    return false;
  }

};