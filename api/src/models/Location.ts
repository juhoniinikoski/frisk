import BaseModel from './BaseModel'
import knex from '../utils/knex'

class Location extends BaseModel {
  
  static idColumn = 'id'

  static tableName = 'locations'
}

export default Location.bindKnex(knex)
