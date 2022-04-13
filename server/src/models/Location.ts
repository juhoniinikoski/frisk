import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

export default class LocationClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'locations';

  createdById: string | number;
  id: string | number;
  name: string;
  description: string;
  street: string
  zipcode: string
  city: string
  country: string
  lat: number
  lon: number

  static relationMappings = {
    events: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Event',
      join: {
        from: 'locations.id',
        to: 'events.locationId'
      }
    },
    activities: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Activity',
      join: {
        from: 'locations.id',
        through: {
          // location_activity is the join table.
          from: 'location_activity.locationId',
          to: 'location_activity.activityId'
        },
        to: 'activities.id'
      }
    },
    savedBy: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'locations.id',
        through: {
          // user_activity is the join table.
          from: 'user_location.locationId',
          to: 'user_location.userId'
        },
        to: 'users.id'
      }
    }
  };

}

export const Location = LocationClass.bindKnex(knex);
