import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

class EventClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'events';

  static relationMappings = {
    
    attendants: {
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

    createdBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'events.createdById',
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

    sport: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Sport',
      join: {
        from: 'events.sportId',
        to: 'sports.id'
      }
    }

  };
  
  id: string | number;
  eventTitle: string;
  description: string;
  locationId: string | number;
  sportId: string | number;
  free: boolean;
  price: number;
  createdById: string | number;
  createdAt: Date;
  start: Date;
  end: Date;
  repetition: string;
}

export default EventClass;

export const Event = EventClass.bindKnex(knex);