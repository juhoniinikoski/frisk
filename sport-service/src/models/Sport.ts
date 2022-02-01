import knex from '../utils/knex';
import { Model } from 'objection';
import BaseModel from './BaseModel';
import SportLocationClass from './SportLocation';
import SportUserClass from './SportUser';

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
    
    users: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/SportUser',
      join: {
        from: 'sports.id',
        to: 'sport_user.sportId'
      }
    }

  };

  id: string | number;
  createdById: string | number;
  name: string | number;
  locations: SportLocationClass[];
  users: SportUserClass[];

}

export const Sport = SportClass.bindKnex(knex);