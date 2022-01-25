import knex from '../utils/knex';
import { Model } from 'objection';

export default class LocationSportClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'location_sport';

}

export const LocationSport = LocationSportClass.bindKnex(knex);