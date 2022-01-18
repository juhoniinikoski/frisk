import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

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
  
}

export const Sport = SportClass.bindKnex(knex);
