import LocationClass, { Location } from '../../models/Location';
import { v4 as uuid } from 'uuid';
import { InvalidIdError, NameTakenError } from '../errors';

interface Args {
  first?: number
  after?: string
  searchKeyword?: string
  activityId?: string | number
  savedBy?: string | number
  orderBy?: string
}

export const getLocations = async (args: Args): Promise<LocationClass[]> => {
  const order = args.orderBy ? args.orderBy : 'name';

  let query = Location.query();

  if (args.activityId) {
    query = query.withGraphJoined('activities').where('activities.id', args.activityId)
  }

  if (args.savedBy) {
    query = query.withGraphJoined('savedBy').where('savedBy.id', args.savedBy);
  }

  return await query.orderBy(order);
};

export const getLocation = async (id: string | number): Promise<LocationClass> => {
  const data = await Location.query().findById(id).withGraphFetched('[activities, events]');

  if (!data) {
    throw new InvalidIdError('Location');
  }

  return data;
};

export const createLocation = async (location: Partial<LocationClass>): Promise<string> => {
  const { name } = location;

  const existingLocation = await Location.query().where('name', name);
  if (existingLocation.length !== 0) {
    throw new NameTakenError('createLocation');
  }

  const id = uuid();

  await Location.query().insertAndFetch({
    ...location,
    id: id,
  });

  return id;
};

export const updateLocation = async (
  id: string | number,
  location: Partial<LocationClass>,
): Promise<string | number> => {
  const { name } = location;

  const existingLocation = await Location.query().where('name', name);

  if (existingLocation.length !== 0) {
    throw new NameTakenError('updateLocation');
  }

  await Location.query().patchAndFetchById(id, location);
  return id;
};

export const deleteLocation = async (id: string | number): Promise<boolean> => {
  const res = await Location.query().findById(id).delete();
  if (res === 0) {
    throw new InvalidIdError('deleteLocation');
  }
  return true;
};
