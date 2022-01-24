import BaseModel from './BaseModel';
import knex from '../utils/knex';

class EventClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'events';
  
  id: string | number;
  name: string;
  description: string;
  locationId: string | number;
  sportId: string | number;
  free: boolean;
  price: number;
  createdById: string | number;
  createdAt: Date;
  start: Date;
  end: Date;
  repetition: string;
}

export default EventClass;

export const Event = EventClass.bindKnex(knex);