import { gql } from 'apollo-server'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { merge } from 'lodash'

import Repetition from './enums/Repetition'

import User from './types/User'
import Sport from './types/Sport'
import Location from './types/Location'
import Address from './types/Address'
import Event from './types/Event'
import UserConnection from './types/UserConnection'
import SportConnection from './types/SportConnection'
import EventConnection from './types/EventConnection'
import PageInfo from './types/PageInfo'

import DateTime from './scalars/DateTime'

const rootTypeDefs = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`

const typeDefs = [
  rootTypeDefs,
  Repetition.typeDefs,
  User.typeDefs,
  Sport.typeDefs,
  Location.typeDefs,
  Address.typeDefs,
  Event.typeDefs,
  UserConnection.typeDefs,
  SportConnection.typeDefs,
  EventConnection.typeDefs,
  PageInfo.typeDefs,
  DateTime.typeDefs,
]

const resolvers = merge(
  User.resolvers,
  Sport.resolvers,
  Location.resolvers,
  Address.resolvers,
  Event.resolvers,
  UserConnection.resolvers,
  SportConnection.resolvers,
  EventConnection.resolvers,
  PageInfo.resolvers,
  DateTime.resolvers,
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default schema