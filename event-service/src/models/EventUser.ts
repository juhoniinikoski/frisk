import knex from '../utils/knex';
import { Model } from 'objection';

export default class EventUserClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'event_user';

}

export const EventUser = EventUserClass.bindKnex(knex);