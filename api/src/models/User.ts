import BaseModel from './BaseModel'
import knex from '../utils/knex'

class User extends BaseModel {
  
  static idColumn = 'id'

  static tableName = 'users'
}

export default User.bindKnex(knex)
