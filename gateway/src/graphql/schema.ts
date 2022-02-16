import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { merge } from 'lodash';

import Repetition from './enums/Repetition';

import User from './types/User';
import Activity from './types/Activity';
import Location from './types/Location';
import Address from './types/Address';
import Event from './types/Event';
import UserConnection from './types/UserConnection';
import ActivityConnection from './types/ActivityConnection';
import EventConnection from './types/EventConnection';
import LocationConnection from './types/LocationConnection';
import PageInfo from './types/PageInfo';

import usersQuery from './queries/users';
import userQuery from './queries/user';
import eventsQuery from './queries/events';
import eventQuery from './queries/event';
import locationsQuery from './queries/locations';
import locationQuery from './queries/location';
import activitiesQuery from './queries/activities';
import activityQuery from './queries/activity';
import meQuery from './queries/me';

import authorizeMutation from './mutations/authorize';
import createUserMutation from './mutations/create/createUser';
import createEventMutation from './mutations/create/createEvent';
import createLocationMutation from './mutations/create/createLocation';
import createActivityMutation from './mutations/create/createActivity';

import deleteEventMutation from './mutations/delete/deleteEvent';
import deleteLocationMutation from './mutations/delete/deleteLocation';
import deleteActivityMutation from './mutations/delete/deleteActivity';
import deleteUserMutation from './mutations/delete/deleteUser';

import followUser from './mutations/follow/followUser';

import updateUser from './mutations/update/updateUser';
import updateEvent from './mutations/update/updateEvent';
import updateLocation from './mutations/update/updateLocation';
import updateActivity from './mutations/update/updateActivity';

import saveEvent from './mutations/save/saveEvent';
import saveLocation from './mutations/save/saveLocation';
import saveActivity from './mutations/save/saveActivity';

import addActivity from './mutations/add/addActivity';

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
  Activity.typeDefs,
  Location.typeDefs,
  Address.typeDefs,
  Event.typeDefs,
  UserConnection.typeDefs,
  ActivityConnection.typeDefs,
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
  activitiesQuery.typeDefs,
  activityQuery.typeDefs,
  authorizeMutation.typeDefs,
  createUserMutation.typeDefs,
  deleteEventMutation.typeDefs,
  createEventMutation.typeDefs,
  createLocationMutation.typeDefs,
  deleteLocationMutation.typeDefs,
  deleteActivityMutation.typeDefs,
  followUser.typeDefs,
  saveEvent.typeDefs,
  addActivity.typeDefs,
  createActivityMutation.typeDefs,
  meQuery.typeDefs,
  saveLocation.typeDefs,
  saveActivity.typeDefs,
  updateUser.typeDefs,
  updateEvent.typeDefs,
  updateLocation.typeDefs,
  updateActivity.typeDefs,
  deleteEventMutation.typeDefs,
  deleteUserMutation.typeDefs
];

const resolvers = merge(
  User.resolvers,
  Activity.resolvers,
  Location.resolvers,
  Address.resolvers,
  Event.resolvers,
  UserConnection.resolvers,
  ActivityConnection.resolvers,
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
  activitiesQuery.resolvers,
  activityQuery.resolvers,
  authorizeMutation.resolvers,
  createUserMutation.resolvers,
  deleteEventMutation.resolvers,
  createEventMutation.resolvers,
  createLocationMutation.resolvers,
  deleteLocationMutation.resolvers,
  deleteActivityMutation.resolvers,
  followUser.resolvers,
  saveEvent.resolvers,
  addActivity.resolvers,
  createActivityMutation.resolvers,
  meQuery.resolvers,
  saveActivity.resolvers,
  saveLocation.resolvers,
  updateUser.resolvers,
  updateEvent.resolvers,
  updateLocation.resolvers,
  updateActivity.resolvers,
  deleteUserMutation.resolvers
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;