import EventClass, { Event } from '../../models/Event';
import { v4 as uuid } from 'uuid';
import { InvalidIdError } from '../errors';

interface Args {
  first?: number
  after?: string
  searchKeyword?: string
  locationId?: string | number
  userId?: string | number
  activityId?: string | number
  savedBy?: string | number
  orderBy?: string
}

export const getEvents = async (args: Args
): Promise<EventClass[]> => {
  const order = args.orderBy ? args.orderBy : 'start';

  let query = Event.query().withGraphJoined('[location, activity, createdBy]');

  if (args.locationId) {
    query = query.where({ locationId: args.locationId });
  }

  if (args.activityId) {
    query = query.where({ activityId: args.activityId });
  }

  if (args.userId) {
    query = query.where({ createdById: args.userId });
  }

  if (args.savedBy) {
    query = query.withGraphJoined('savedBy').where('savedBy.id', args.savedBy);
  }

  return await query.orderBy(order);
};

export const getEvent = async (id: string | number): Promise<EventClass> => {
  const data = await Event.query().findById(id).withGraphFetched('[attendants, location, activity, createdBy]');

  if (!data) {
    throw new InvalidIdError('Event');
  }

  return data;
};

export const createEvent = async (event: Partial<EventClass>): Promise<string> => {
  const id = uuid();

  await Event.query().insertAndFetch({
    ...event,
    id: id,
  });

  return id;
};

export const updateEvent = async (id: string | number, event: Partial<EventClass>): Promise<string | number> => {
  await Event.query().patchAndFetchById(id, event);
  return id;
};

export const deleteEvent = async (id: string | number): Promise<boolean> => {
  const res = await Event.query().findById(id).delete();
  if (res === 0) {
    throw new InvalidIdError('deleteEvent');
  }
  return true;
};
