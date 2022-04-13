import BaseModel from './BaseModel';
import knex from '../utils/knex';

class AddressClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'addresses';

  id: string | number;
  street: string
  zipcode: string
  city: string
  lat: number
  lon: number
}

export default AddressClass;

export const Address = AddressClass.bindKnex(knex);