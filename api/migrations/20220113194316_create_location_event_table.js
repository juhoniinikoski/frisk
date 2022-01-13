exports.up = function(knex) {
  return knex.schema.createTable('location_event', table => {
    table.increments('id').primary()
    table.text('location_id').notNullable()
    table.text('event_id').notNullable()

    table.foreign('location_id')
      .references('id')
      .inTable('locations')
      .onDelete('cascade')
    table.foreign('event_id')
      .references('id')
      .inTable('events')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('location_event')
}