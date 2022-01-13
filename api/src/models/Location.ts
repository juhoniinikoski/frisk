import BaseModel from './BaseModel'
import knex from '../utils/knex'
import { Model } from 'objection'

export default class LocationClass extends BaseModel {
  
  static idColumn = 'id'

  static tableName = 'locations'

  static relationMappings = {
    
    events: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Event',
      join: {
        from: 'locations.id',
        through: {
          // user_event is the join table.
          from: 'location_event.locationId',
          to: 'location_event.eventId'
        },
        to: 'events.id'
      }
    },

    sports: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Sport',
      join: {
        from: 'locations.id',
        through: {
          // user_event is the join table.
          from: 'location_sport.locationId',
          to: 'location_sport.sportId'
        },
        to: 'sports.id'
      }
    },

  }
}

export const Location = LocationClass.bindKnex(knex)
