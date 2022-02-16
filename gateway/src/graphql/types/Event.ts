import { gql } from 'apollo-server';
import { Event } from '../../entities';

export const typeDefs = gql`
type Event {
  id: ID!
  name: String!
  description: String
  location: Location!
  locationId: ID!
  activity: Activity!
  attendants: [User]
  free: Boolean!
  price: Float!
  createdById: ID!
  createdBy: User!
  createdAt: DateTime!
  activityId: ID!
  start: DateTime!
  end: DateTime!
  repetition: Repetition!
}
`;

export const resolvers = {
  Event: {
    createdBy: (obj: Event) => {
      return {
        username: obj.createdByName,
        id: obj.createdById
      };
    },
    location: (obj: Event) => {
      return {
        name: obj.locationName,
        id: obj.locationId
      };
    },
    activity: (obj: Event) => {
      return {
        name: obj.activityName,
        id: obj.activityId
      };
    }
  }
};

export default {
  typeDefs,
  resolvers,
};