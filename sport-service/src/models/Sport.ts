import knex from '../utils/knex';
import { Model } from 'objection';
import BaseModel from './BaseModel';

export default class SportClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'sports';

  static relationMappings = {

    locations: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/SportLocation',
      join: {
        from: 'sports.id',
        to: 'sport_location.sportId'
      }
    },

  };

  id: string | number;
  createdById: string | number;
  name: string | number;
  
}

export const Sport = SportClass.bindKnex(knex);