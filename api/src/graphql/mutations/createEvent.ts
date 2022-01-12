import { gql } from 'apollo-server'
import * as yup from 'yup'
import { v4 as uuid } from 'uuid'
import Event from '../../models/Event'

export const typeDefs = gql`
  input CreateEventInput {
    eventTitle: String!
    description: String
    locationId: ID!
    sportId: ID!
    start: Int!
    end: Int!
  }
  extend type Mutation {
    createEvent(event: CreateEventInput): Boolean
  }
`

const argsSchema = yup.object().shape({
  event: yup.object().shape({
    eventTitle: yup
      .string()
      .max(200)
      .trim(),
  }),
})

interface Args {
  event: {
    eventTitle: string
    description: string
    locationId: string | number
    sportId: string | number
    start: number
    end: number
  }
}

export const resolvers = {
  Mutation: {
    createEvent: async (_obj: any, args: Args, { authService }: any) => {
      
      const authorizedUser = await authService.getAuthorizedUserOrFail()

      const { event } = await argsSchema.validate(args, {
        stripUnknown: true,
      })

      await Event.query().insertAndFetch({
        id: uuid(),
        userId: authorizedUser.id,
        eventTitle: event.eventTitle,
        locationId: args.event.locationId,
        sportId: args.event.sportId,
        start: new Date(args.event.start * 1000),
        end: new Date(args.event.end * 1000)
      })

      return true
    },
  },
}

export default {
  typeDefs,
  resolvers,
}