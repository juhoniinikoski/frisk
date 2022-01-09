import BaseModel from './BaseModel'
import knex from '../utils/knex'

class Event extends BaseModel {
  
  static idColumn = 'id'

  static tableName = 'events'
}

export default Event.bindKnex(knex)
