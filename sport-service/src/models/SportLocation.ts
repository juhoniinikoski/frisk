import knex from '../utils/knex';
import { Model } from 'objection';

export default class SportLocationClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'sport_location';

}

export const SportLocation = SportLocationClass.bindKnex(knex);