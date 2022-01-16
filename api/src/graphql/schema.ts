import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { merge } from 'lodash';

import Repetition from './enums/Repetition';

import User from './types/User';
import Sport from './types/Sport';
import Location from './types/Location';
import Address from './types/Address';
import Event from './types/Event';
import UserConnection from './types/UserConnection';
import SportConnection from './types/SportConnection';
import EventConnection from './types/EventConnection';
import LocationConnection from './types/LocationConnection';
import PageInfo from './types/PageInfo';

import usersQuery from './queries/users';
import userQuery from './queries/user';
import eventsQuery from './queries/events';
import eventQuery from './queries/event';
import locationsQuery from './queries/locations';
import locationQuery from './queries/location';
import sportsQuery from './queries/sports';
import sportQuery from './queries/sport';

import authorizeMutation from './mutations/authorize';
import createUserMutation from './mutations/createUser';
import createEventMutation from './mutations/createEvent';
import deleteEventMutation from './mutations/deleteEvent';

import DateTime from './scalars/DateTime';

/* eslint-disable  @typescript-eslint/no-unsafe-assignment */

const rootTypeDefs = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

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
  userQuery.typeDefs,
  eventsQuery.typeDefs,
  locationsQuery.typeDefs,
  locationQuery.typeDefs,
  eventQuery.typeDefs,
  sportsQuery.typeDefs,
  sportQuery.typeDefs,
  authorizeMutation.typeDefs,
  createUserMutation.typeDefs,
  deleteEventMutation.typeDefs,
  createEventMutation.typeDefs
];

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
  userQuery.resolvers,
  eventsQuery.resolvers,
  locationsQuery.resolvers,
  locationQuery.resolvers,
  eventQuery.resolvers,
  sportsQuery.resolvers,
  sportQuery.resolvers,
  authorizeMutation.resolvers,
  createUserMutation.resolvers,
  deleteEventMutation.resolvers,
  createEventMutation.resolvers
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;