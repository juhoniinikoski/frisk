import knex from '../utils/knex';
import { Model } from 'objection';

export default class UserLocationClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'user_location';

}

export const UserLocation = UserLocationClass.bindKnex(knex);