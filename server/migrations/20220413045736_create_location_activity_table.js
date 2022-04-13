exports.up = function(knex) {
  return knex.schema.createTable('location_activity', table => {
    table.increments('id').primary()
    table.text('activity_id').notNullable()
    table.text('location_id').notNullable()

    table.foreign('activity_id')
      .references('id')
      .inTable('activities')
      .onDelete('cascade')
    
    table.foreign('location_id')
      .references('id')
      .inTable('locations')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('location_activity')
}