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
    eventId: string | number;
  }[];
  savedLocations: {
    id: string | number;
    userId: string | number;
    locationId: string | number;
  }[];
  savedActivities: {
    id: string | number;
    userId: string | number;
    activityId: string | number;
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
          to: 'user_user.followingId',
        },
        to: 'users.id',
      },
    }
  };
}

export default UserClass;

export const User = UserClass.bindKnex(knex);
