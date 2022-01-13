import BaseModel from './BaseModel'
import knex from '../utils/knex'
import { Model } from 'objection'
import Event from './Event'

export class User extends BaseModel {
  
  static idColumn = 'id'

  static tableName = 'users'

  static relationMappings = {
    
    following: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
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

    events: {
      relation: Model.ManyToManyRelation,
      modelClass: Event,
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
  }

}

export default User.bindKnex(knex)
