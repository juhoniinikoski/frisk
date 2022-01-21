exports.up = function(knex) {
  return knex.schema.createTable('user_sport', table => {
    table.increments('id').primary()
    table.text('user_id').notNullable()
    table.text('sport_id').notNullable()

    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
    table.foreign('sport_id')
      .references('id')
      .inTable('sports')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_sport')
}