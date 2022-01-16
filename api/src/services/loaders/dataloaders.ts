import DataLoader from 'dataloader';
import { User } from '../../models/User';
import { Location } from '../../models/Location';
import { Sport } from '../../models/Sport';
import { ModelObject } from 'objection';
import { Event } from '../../models/Event';

 /* eslint-disable */

const batchFunction = (keys: readonly unknown[], Model: ModelObject<any>) => {
  return Promise.all(keys.map(key => {
    return Model.query().findByIds(key) || null;
  }));
};

const singleFunction = (keys: readonly unknown[], Model: ModelObject<any>) => 
  Model.query().findByIds(keys);

// The list of data loaders

export const loaders = {

  user: new DataLoader(keys => singleFunction(keys, User)),

  location: new DataLoader(keys => singleFunction(keys, Location)),

  event: new DataLoader(keys => singleFunction(keys, Event)),

  sport: new DataLoader(keys => singleFunction(keys, Sport)),

  sports: new DataLoader(keys => batchFunction(keys, Sport))

};