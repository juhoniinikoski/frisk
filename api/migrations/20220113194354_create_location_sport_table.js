exports.up = function(knex) {
  return knex.schema.createTable('location_sport', table => {
    table.increments('id').primary()
    table.text('location_id').notNullable()
    table.text('sport_id').notNullable()

    table.foreign('location_id')
      .references('id')
      .inTable('locations')
      .onDelete('cascade')
    table.foreign('sport_id')
      .references('id')
      .inTable('sports')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('location_sport')
}