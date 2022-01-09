import BaseModel from './BaseModel'
import knex from '../utils/knex'

class Sport extends BaseModel {
  
  static idColumn = 'id'

  static tableName = 'sports'
}

export default Sport.bindKnex(knex)
