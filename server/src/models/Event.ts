import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

class EventClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'events';

  id: string | number;
  name: string;
  description: string;
  locationId: string | number;
  activityId: string | number;
  free: boolean;
  price: number;
  createdById: string | number;
  createdAt: Date;
  updatedAt: Date;
  start: Date | number;
  end: Date | number;
  maxAttendants: number;

  static relationMappings = {
    
    attendants: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'events.id',
        through: {
          // attendants is the join table.
          from: 'attendants.eventId',
          to: 'attendants.userId'
        },
        to: 'users.id'
      }
    },
    savedBy: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'events.id',
        through: {
          // user_event is the join table.
          from: 'user_event.eventId',
          to: 'user_event.userId'
        },
        to: 'users.id'
      }
    },
    location: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Location',
      join: {
        from: 'events.locationId',
        to: 'locations.id'
      }
    },
    activity: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Activity',
      join: {
        from: 'events.activityId',
        to: 'activities.id'
      }
    },
    createdBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'events.createdById',
        to: 'users.id'
      }
    }
  };
}

export default EventClass;

export const Event = EventClass.bindKnex(knex);
