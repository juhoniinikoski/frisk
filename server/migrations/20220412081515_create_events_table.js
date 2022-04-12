exports.up = function(knex) {
  return knex.schema.createTable('events', table => {
    table.text('id').primary()
    table.text('created_by_id')
    table.text('name')
    table.text('location_id')
    table.specificType('latitude', 'double precision')
    table.specificType('longitude', 'double precision')
    table.text('activity_id')
    table.boolean('free')
    table.float('price')
    table.text('description')
    table.timestamp('created_at')
    table.timestamp('updated_at')
    table.timestamp('start')
    table.timestamp('end')
    table.integer('max_attendants')
    table.index(['created_by_id', 'location_id', 'activity_id'])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('events');
};