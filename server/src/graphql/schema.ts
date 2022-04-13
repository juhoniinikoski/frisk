import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { merge } from 'lodash';

import User from './types/User';
import Activity from './types/Activity';
import Address from './types/Address';
import Event from './types/Event';
import Location from './types/Location';
import PageInfo from './types/PageInfo';
import DateTime from './scalars/DateTime';

import ActivityConnection from './types/ActivityConnection';
import EventConnection from './types/EventConnection';
import LocationConnection from './types/LocationConnection';
import UserConnection from './types/UserConnection';

import UserQuery from './queries/user';
import UsersQuery from './queries/users';
import ActivityQuery from './queries/activity';
import ActivitiesQuery from './queries/activities';
import LocationQuery from './queries/location';
import LocationsQuery from './queries/locations';
import EventQuery from './queries/event';
import EventsQuery from './queries/events';

import CreateUser from './mutations/create/createUser';

import UpdateUser from './mutations/update/updateUser';

import DeleteUser from './mutations/delete/deleteUser';

import Authorize from './mutations/authorize';

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
  User.typeDefs,
  DateTime.typeDefs,
  UserQuery.typeDefs,
  UsersQuery.typeDefs,
  CreateUser.typeDefs,
  UpdateUser.typeDefs,
  Authorize.typeDefs,
  DeleteUser.typeDefs,
  Activity.typeDefs,
  Address.typeDefs,
  Event.typeDefs,
  Location.typeDefs,
  PageInfo.typeDefs,
  ActivityConnection.typeDefs,
  EventConnection.typeDefs,
  LocationConnection.typeDefs,
  UserConnection.typeDefs,
  ActivityQuery.typeDefs,
  ActivitiesQuery.typeDefs,
  LocationQuery.typeDefs,
  LocationsQuery.typeDefs,
  EventQuery.typeDefs,
  EventsQuery.typeDefs
];

const resolvers = merge(
  User.resolvers,
  DateTime.resolvers,
  UserQuery.resolvers,
  UsersQuery.resolvers,
  CreateUser.resolvers,
  UpdateUser.resolvers,
  Authorize.resolvers,
  DeleteUser.resolvers,
  Activity.resolvers,
  Address.resolvers,
  Event.resolvers,
  Location.resolvers,
  PageInfo.resolvers,
  ActivityConnection.resolvers,
  EventConnection.resolvers,
  LocationConnection.resolvers,
  UserConnection.resolvers,
  ActivityQuery.resolvers,
  ActivitiesQuery.resolvers,
  LocationQuery.resolvers,
  LocationsQuery.resolvers,
  EventQuery.resolvers,
  EventsQuery.resolvers
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
