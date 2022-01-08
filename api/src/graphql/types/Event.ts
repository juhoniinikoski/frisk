import { gql } from 'apollo-server'

export const typeDefs = gql`
type Event {
  id: ID!
  name: String!
  description: String
  location: Location!
  sport: Sport!
  attendants: UserConnection!
  free: Boolean!
  price: Float!
  createdBy: User!
  createdAt: DateTime!
  start: DateTime!
  end: DateTime!
  repetition: Repetition!
}
`

export const resolvers = {}

export default {
  typeDefs,
  resolvers,
}