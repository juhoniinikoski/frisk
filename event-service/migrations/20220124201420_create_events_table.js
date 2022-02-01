exports.up = function(knex) {
  return knex.schema.createTable('events', table => {
    table.text('id').primary()
    table.text('created_by_id')
    table.text('created_by_name')
    table.text('name')
    table.text('location_id')
    table.text('location_name')
    table.text('sport_id')
    table.text('sport_name')
    table.boolean('free')
    table.float('price')
    table.text('description')
    table.timestamp('created_at')
    table.timestamp('updated_at')
    table.timestamp('start')
    table.timestamp('end')
    table.text('repetition')
    table.index(['created_by_id', 'location_id', 'sport_id'])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('events');
};