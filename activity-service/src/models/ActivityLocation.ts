import knex from '../utils/knex';
import { Model } from 'objection';

export default class ActivityLocationClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'activity_location';

}

export const ActivityLocation = ActivityLocationClass.bindKnex(knex);