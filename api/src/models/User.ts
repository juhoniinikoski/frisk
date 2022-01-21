import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

class UserClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'users';

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
    },

    savedSports: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Sport',
      join: {
        from: 'users.id',
        through: {
          // user_sport is the join table.
          from: 'user_sport.userId',
          to: 'user_sport.sportId'
        },
        to: 'sports.id'
      }
    },

    savedLocations: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Location',
      join: {
        from: 'users.id',
        through: {
          // user_location is the join table.
          from: 'user_location.userId',
          to: 'user_location.locationId'
        },
        to: 'locations.id'
      }
    }
  };

  username: string;
  password: string;
  id: string | number;
  email: string;

}

export default UserClass;

export const User = UserClass.bindKnex(knex);
