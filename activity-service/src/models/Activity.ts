import knex from '../utils/knex';
import { Model } from 'objection';
import BaseModel from './BaseModel';
import ActivityLocationClass from './ActivityLocation';
import ActivityUserClass from './ActivityUser';

export default class ActivityClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'activities';

  static relationMappings = {

    locations: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/ActivityLocation',
      join: {
        from: 'activities.id',
        to: 'activity_location.activityId'
      }
    },
    
    users: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/ActivityUser',
      join: {
        from: 'activities.id',
        to: 'activity_user.activityId'
      }
    }

  };

  id: string | number;
  createdById: string | number;
  name: string | number;
  locations: ActivityLocationClass[];
  users: ActivityUserClass[];

}

export const Activity = ActivityClass.bindKnex(knex);