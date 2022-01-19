import knex from '../utils/knex';
import { Model } from 'objection';
import BaseModel from './BaseModel';

export default class SportClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'sports';

  static relationMappings = {
    
    events: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Event',
      join: {
        from: 'sports.id',
        to: 'events.sportId'
      }
    },

    locations: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Location',
      join: {
        from: 'sports.id',
        through: {
          from: 'location_sport.sportId',
          to: 'location_sport.locationId'
        },
        to: 'locations.id'
      }
    },

  };

  createdById: string | number;
  
}

export const Sport = SportClass.bindKnex(knex);
