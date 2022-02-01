import knex from '../utils/knex';
import { Model } from 'objection';

export default class LocationUserClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'location_user';

}

export const LocationUser = LocationUserClass.bindKnex(knex);