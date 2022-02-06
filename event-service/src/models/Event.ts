import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

class EventClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'events';

  static relationMappings = {

    savedBy: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/EventUser',
      join: {
        from: 'events.id',
        to: 'event_user.eventId'
      }
    },

  };
  
  id: string | number;
  name: string;
  description: string;
  locationId: string | number;
  sportId: string | number;
  free: boolean;
  price: number;
  createdById: string | number;
  createdAt: Date;
  start: Date | number;
  end: Date | number;
  repetition: string;
}

export default EventClass;

export const Event = EventClass.bindKnex(knex);