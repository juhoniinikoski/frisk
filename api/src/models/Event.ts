import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

export default class EventClass extends BaseModel {
  
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
    }

  };
}

export const Event = EventClass.bindKnex(knex);