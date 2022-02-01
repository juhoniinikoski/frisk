import knex from '../utils/knex';
import { Model } from 'objection';

export default class SportUserClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'sport_user';

}

export const SportUser = SportUserClass.bindKnex(knex);