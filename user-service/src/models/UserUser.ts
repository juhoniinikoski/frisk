import knex from '../utils/knex';
import { Model } from 'objection';

export default class UserUserClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'user_user';

}

export const UserUser = UserUserClass.bindKnex(knex);
