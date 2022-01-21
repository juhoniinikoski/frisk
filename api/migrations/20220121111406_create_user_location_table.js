exports.up = function(knex) {
  return knex.schema.createTable('user_location', table => {
    table.increments('id').primary()
    table.text('location_id').notNullable()
    table.text('user_id').notNullable()

    table.foreign('location_id')
      .references('id')
      .inTable('locations')
      .onDelete('cascade')
    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_location')
}