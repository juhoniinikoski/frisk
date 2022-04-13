exports.up = function(knex) {
  return knex.schema.createTable('attendants', table => {
    table.increments('id').primary()
    table.text('user_id').notNullable()
    table.text('event_id').notNullable()

    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
    
    table.foreign('event_id')
      .references('id')
      .inTable('events')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('attendants')
}