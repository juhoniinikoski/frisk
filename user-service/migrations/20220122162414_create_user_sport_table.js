exports.up = function(knex) {
  return knex.schema.createTable('user_activity', table => {
    table.increments('id').primary()
    table.text('user_id').notNullable()
    table.text('activity_id').notNullable()

    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_activity')
}