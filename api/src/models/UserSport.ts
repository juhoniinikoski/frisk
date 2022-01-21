import knex from '../utils/knex';
import { Model } from 'objection';

export default class UserSportClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'user_sport';

}

export const UserSport = UserSportClass.bindKnex(knex);
