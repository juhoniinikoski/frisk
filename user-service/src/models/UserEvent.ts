import knex from '../utils/knex';
import { Model } from 'objection';

export default class UserEventClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'user_event';

}

export const UserEvent = UserEventClass.bindKnex(knex);
