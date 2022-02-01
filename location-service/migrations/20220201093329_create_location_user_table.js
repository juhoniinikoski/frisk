exports.up = function(knex) {
  return knex.schema.createTable('location_user', table => {
    table.increments('id').primary()
    table.text('location_id').notNullable()
    table.text('user_id').notNullable()

    table.foreign('location_id')
      .references('id')
      .inTable('locations')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('location_user')
}