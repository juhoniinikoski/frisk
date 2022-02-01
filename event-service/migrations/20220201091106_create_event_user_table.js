  exports.up = function(knex) {
  return knex.schema.createTable('event_user', table => {
    table.increments('id').primary()
    table.text('user_id').notNullable()
    table.text('event_id').notNullable()

    table.foreign('event_id')
      .references('id')
      .inTable('events')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('event_user')
}