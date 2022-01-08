exports.up = function(knex) {
  return knex.schema.createTable('events', table => {
    table.text('id').primary()
    table
      .text('user_id')
      .references('users.id')
      .onDelete('cascade')
    table.text('event_title')
    table
      .text('location_id')
      .references('locations.id')
      .onDelete('cascade')
    table
      .text('sport_id')
      .references('sports.id')
      .onDelete('cascade')
    table.boolean('free')
    table.float('price')
    table.text('event_description')
    table.timestamp('created_at')
    table.timestamp('updated_at')
    table.timestamp('start')
    table.timestamp('end')
    table.text('repetition')
    table.index(['user_id', 'location_id', 'sport_id'])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('events');
};