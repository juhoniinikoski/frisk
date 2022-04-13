import { Model } from 'objection';
import knex from '../utils/knex';
import BaseModel from './BaseModel';
import LocationClass from './Location';

export default class ActivityClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'activities';

  id: string | number;
  name: string | number;
  createdAt: Date
  updatedAt: Date
  locations: LocationClass[]

  static relationMappings = {
    events: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Event',
      join: {
        from: 'activities.id',
        to: 'events.activityId'
      }
    },
    locations: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Location',
      join: {
        from: 'activities.id',
        through: {
          // location_activity is the join table.
          from: 'location_activity.activityId',
          to: 'location_activity.locationId'
        },
        to: 'locations.id'
      }
    },
    savedBy: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'activities.id',
        through: {
          // user_activity is the join table.
          from: 'user_activity.activityId',
          to: 'user_activity.userId'
        },
        to: 'users.id'
      }
    }
  };

}

export const Activity = ActivityClass.bindKnex(knex);