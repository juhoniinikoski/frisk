exports.up = function(knex) {
  return knex.schema.createTable('sport_user', table => {
    table.increments('id').primary()
    table.text('user_id').notNullable()
    table.text('sport_id').notNullable()

    table.foreign('sport_id')
      .references('id')
      .inTable('sports')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sport_user')
}