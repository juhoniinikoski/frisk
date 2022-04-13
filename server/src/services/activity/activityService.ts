import ActivityClass, { Activity } from "../../models/Activity";
import { v4 as uuid } from 'uuid';
import { InvalidIdError, NameTakenError } from "../errors";

interface Args {
  first?: number
  after?: string
  searchKeyword?: string
  locationId?: string | number
  savedBy?: string | number
  orderBy?: string
}

export const getActivities = async (args: Args): Promise<ActivityClass[]> => {

  const order = args.orderBy ? args.orderBy : 'name';
  
  let query = Activity.query();

  if (args.locationId) {
    query = query.withGraphJoined('locations').where('locations.id', args.locationId)
  };
  
  if (args.savedBy) {
    query = query.withGraphJoined('savedBy').where('savedBy.id', args.savedBy)
  };

  return await query.orderBy(order);
};

export const getActivity = async (id: string | number): Promise<ActivityClass> => {

  const data = await Activity.query().findById(id).withGraphFetched('[events, locations]');

  if (!data) {
    throw new InvalidIdError('Activity');
  }

  return data;

};

export const createActivity = async (activity: Partial<ActivityClass>): Promise<string> => {

  const { name } = activity;

  const existingActivity = await Activity.query().where('name', name);
  if (existingActivity.length !== 0) {
    throw new NameTakenError('createActivity');
  }

  const id = uuid();

  await Activity.query().insertAndFetch({
    ...activity,
    id: id,
  });

  return id;

};

export const updateActivity = async (id: string | number, activity: Partial<ActivityClass>): Promise<string | number> => {

    const { name } = activity;

    const existingActivity = await Activity.query()
      .where('name', name);

    if (existingActivity.length !== 0) {
      throw new NameTakenError('updateLocation');
    }

    await Activity.query().patchAndFetchById(id, activity);
    return id;

};

export const deleteActivity = async (id: string | number): Promise<boolean> => {

  const res = await Activity.query().findById(id).delete();
  if (res === 0) {
    throw new InvalidIdError('deleteActivity');
  }
  return true;

};