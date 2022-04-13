import { gql } from 'apollo-server';

export const typeDefs = gql`
type Event {
  id: ID!
  name: String!
  description: String
  location: Location!
  locationId: ID!
  activity: Activity!
  attendants: [User]
  maxAttendants: Int!
  free: Boolean!
  price: Float!
  createdById: ID!
  createdBy: User!
  createdAt: DateTime!
  activityId: ID!
  start: DateTime!
  end: DateTime!
}
`;

export const resolvers = {
  Event: {
    // createdBy: (obj: EventClass) => {
    //   return {
    //     username: obj.createdByName,
    //     id: obj.createdById
    //   };
    // },
    // location: (obj: Event) => {
    //   return {
    //     name: obj.locationName,
    //     id: obj.locationId,
    //     latitude: obj.latitude,
    //     longitude: obj.longitude
    //   };
    // },
    // activity: (obj: Event) => {
    //   return {
    //     name: obj.activityName,
    //     id: obj.activityId
    //   };
    // }
  }
};

export default {
  typeDefs,
  resolvers,
};