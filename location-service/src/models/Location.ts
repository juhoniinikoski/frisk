import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

export default class LocationClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'locations';

  static relationMappings = {

    sports: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/LocationSport',
      join: {
        from: 'locations.id',
        to: 'location_sport.locationId'
      }
    },

  };

  createdById: string | number;
  id: string | number;
  name: string;
  description: string;
  
}

export const Location = LocationClass.bindKnex(knex);