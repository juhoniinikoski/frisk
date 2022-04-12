exports.up = function (knex) {
  return knex.schema.createTable('locations', (table) => {
    table.text('id').primary()
    table.text('name').unique()
    table.text('description')
    table.text('address_id')
    table.timestamp('created_at')
    table.timestamp('updated_at')
    table.index('name')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('locations')
}