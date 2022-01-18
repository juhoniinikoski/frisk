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

const singleFunctionRelation = (keys: readonly unknown[], Model: ModelObject<any>, relations: string) => 
  Model.query().findByIds(keys).withGraphFetched(`[${relations}]`);

const eventFunction = (keys: readonly unknown[], Model: ModelObject<any>) => 
  Model.query().findByIds(keys).withGraphFetched('attendants').cursorPaginate({
    orderBy: 'id'
  });

const userFunction = async (keys: readonly unknown[], Model: ModelObject<any>) => 
  await Model.query().findByIds(keys).withGraphFetched('[following, upcoming]')

const usersFunction = async (keys: readonly unknown[], Model: ModelObject<any>) => 
  await Model.query()

// The list of data loaders

export const loaders = {

  authorizedUser: new DataLoader(keys => singleFunction(keys, User)),

  user: new DataLoader(keys => singleFunctionRelation(keys, User, 'following, upcoming')),

  location: new DataLoader(keys => singleFunctionRelation(keys, Location, 'events, sports')),

  event: new DataLoader(keys => singleFunctionRelation(keys, Event, 'attendants, sport, location, createdBy')),

  sport: new DataLoader(keys => singleFunctionRelation(keys, Sport, 'events, locations')),

};