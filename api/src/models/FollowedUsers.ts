import BaseModel from './BaseModel'
import knex from '../utils/knex'

class FollowedUsers extends BaseModel {
  
  static idColumn = 'id'

  static tableName = 'followed_users'
}

export default FollowedUsers.bindKnex(knex)