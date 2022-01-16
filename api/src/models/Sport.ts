import BaseModel from './BaseModel';
import knex from '../utils/knex';

export default class SportClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'sports';
}

export const Sport = SportClass.bindKnex(knex);
