import knex from '../utils/knex';
import { Model } from 'objection';

export default class ActivityUserClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'activity_user';

}

export const ActivityUser = ActivityUserClass.bindKnex(knex);