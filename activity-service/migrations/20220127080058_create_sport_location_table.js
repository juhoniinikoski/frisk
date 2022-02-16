exports.up = function(knex) {
  return knex.schema.createTable('activity_location', table => {
    table.increments('id').primary()
    table.text('location_id').notNullable()
    table.text('activity_id').notNullable()

    table.foreign('activity_id')
      .references('id')
      .inTable('activities')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('activity_location')
}