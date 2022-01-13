import BaseModel from './BaseModel'
import knex from '../utils/knex'
import { Model } from 'objection'
// import { User } from './User'

export class Event extends BaseModel {
  
  static idColumn = 'id'

  static tableName = 'events'

  // static relationMappings = {
    
  //   followedBy: {
  //     relation: Model.ManyToManyRelation,
  //     modelClass: User,
  //     join: {
  //       from: 'events.id',
  //       through: {
  //         // user_event is the join table.
  //         from: 'user_event.eventId',
  //         to: 'user_event.userId'
  //       },
  //       to: 'users.id'
  //     }
  //   }

  // }
}

export default Event.bindKnex(knex)
