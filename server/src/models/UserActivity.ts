import knex from '../utils/knex';
import { Model } from 'objection';

export default class UserActivityClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'user_activity';

}

export const UserActivity = UserActivityClass.bindKnex(knex);