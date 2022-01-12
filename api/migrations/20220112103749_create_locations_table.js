exports.up = function (knex) {
  return knex.schema.createTable('locations', (table) => {
    table.text('id').primary()
    table.text('name').unique()
    table.text('location_description')
    table.specificType('sport_id', 'text[]')
    table.timestamp('created_at')
    table.timestamp('updated_at')
    table.json('address')
    table.index('name')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('locations')
}