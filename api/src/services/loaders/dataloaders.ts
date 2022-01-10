import DataLoader from 'dataloader'
import User from '../../models/User'
import Location from '../../models/Location'
import Sport from '../../models/Sport'
import { Model, ModelObject } from 'objection'

// The list of data loaders

const batchFunction = (keys: readonly unknown[], Model: ModelObject<any>) => {
  return Promise.all(keys.map(key => {
    return Model.query().findByIds(key) || null
  }))
}

const singleFunction = (keys: readonly unknown[], Model: ModelObject<any>) => 
  Model.query().findByIds(keys)


export const loaders = {

  user: new DataLoader(keys => singleFunction(keys, User)),

  users: new DataLoader(keys => batchFunction(keys, User)),

  location: new DataLoader(keys => singleFunction(keys, Location)),

  sport: new DataLoader(keys => singleFunction(keys, Sport)),

  sports: new DataLoader(keys => batchFunction(keys, Sport))
  
}