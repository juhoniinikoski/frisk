import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

class UserClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'users';

  username: string;
  password: string;
  id: string | number;
  email: string;
  updatedAt: Date;
  createdAt: Date;
  savedEvents: {
    id: string | number;
    userId: string | number;
    eventId: string | number
  }[];
  savedLocations: {
    id: string | number;
    userId: string | number;
    locationId: string | number
  }[];
  savedActivities: {
    id: string | number;
    userId: string | number;
    activityId: string | number
  }[];

  static relationMappings = {
    
    followedUsers: {
      relation: Model.ManyToManyRelation,
      modelClass: UserClass,
      join: {
        from: 'users.id',
        through: {
          // user_user is the join table.
          from: 'user_user.followerId',
          to: 'user_user.followingId'
        },
        to: 'users.id'
      }
    },

    savedEvents: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/UserEvent',
      join: {
        from: 'users.id',
        to: 'user_event.userId'
      }
    },

    savedActivities: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/UserActivity',
      join: {
        from: 'users.id',
        to: 'user_activity.userId'
      }
    },

    savedLocations: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/UserLocation',
      join: {
        from: 'users.id',
        to: 'user_location.userId'
      }
    }
  };

}

export default UserClass;

export const User = UserClass.bindKnex(knex);