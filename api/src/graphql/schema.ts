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
import LocationConnection from './types/LocationConnection'
import PageInfo from './types/PageInfo'

import usersQuery from './queries/users'
import eventsQuery from './queries/events'
import locationsQuery from './queries/locations'

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
  LocationConnection.typeDefs,
  PageInfo.typeDefs,
  DateTime.typeDefs,
  usersQuery.typeDefs,
  eventsQuery.typeDefs,
  locationsQuery.typeDefs,
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
  LocationConnection.resolvers,
  PageInfo.resolvers,
  DateTime.resolvers,
  usersQuery.resolvers,
  eventsQuery.resolvers,
  locationsQuery.resolvers,
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default schema