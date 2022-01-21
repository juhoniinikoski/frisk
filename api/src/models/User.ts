import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

class UserClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'users';

  static relationMappings = {
    
    following: {
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

    saved: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Event',
      join: {
        from: 'users.id',
        through: {
          // user_event is the join table.
          from: 'user_event.userId',
          to: 'user_event.eventId'
        },
        to: 'events.id'
      }
    }
  };

  username: string;
  password: string;
  id: string | number;
  email: string

}

export default UserClass;

export const User = UserClass.bindKnex(knex);
