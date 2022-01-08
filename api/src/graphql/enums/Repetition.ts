import { gql } from 'apollo-server'

export const typeDefs = gql`
  enum Repetition {
    SINGLE
    DAILY
    WEEKLY
    MONTHLY
    ANNUALY
  }
`

export default {
  typeDefs
}