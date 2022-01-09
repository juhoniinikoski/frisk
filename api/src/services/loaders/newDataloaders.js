import DataLoader from 'dataloader'
import User from '../../models/User'
import Location from '../../models/Location'
import Sport from '../../models/Sport'

// The list of data loaders

export const loaders = {
  user: new DataLoader(ids => User.query()
    .findByIds(ids)),

  location: new DataLoader(ids => Location.query()
    .findByIds(ids)),

  sport: new DataLoader(ids => Sport.query()
    .findByIds(ids)),
}