import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

export default class LocationClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'locations';

  static relationMappings = {

    activities: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/LocationActivity',
      join: {
        from: 'locations.id',
        to: 'location_activity.locationId'
      }
    },
    
    savedBy: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/LocationUser',
      join: {
        from: 'locations.id',
        to: 'location_user.locationId'
      }
    }

  };

  createdById: string | number;
  id: string | number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  
}

export const Location = LocationClass.bindKnex(knex);