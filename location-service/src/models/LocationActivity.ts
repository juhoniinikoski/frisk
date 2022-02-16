import knex from '../utils/knex';
import { Model } from 'objection';

export default class LocationActivityClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'location_activity';

}

export const LocationActivity = LocationActivityClass.bindKnex(knex);