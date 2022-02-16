exports.up = function (knex) {
  return knex.schema.createTable('locations', (table) => {
    table.text('id').primary()
    table.text('name').unique()
    table.text('created_by_id')
    table.text('description')
    table.timestamp('created_at')
    table.timestamp('updated_at')
    table.specificType('latitude', 'double precision')
    table.specificType('longitude', 'double precision')
    table.text('street')
    table.text('zipcode')
    table.text('city')
    table.text('country')
    table.index('name')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('locations')
}