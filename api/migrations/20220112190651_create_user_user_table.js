exports.up = function(knex) {
  return knex.schema.createTable('user_user', table => {
    table.increments('id').primary()
    table.text('follower_id').notNullable()
    table.text('following_id').notNullable()

    table.foreign('follower_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
    table.foreign('following_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_user')
}