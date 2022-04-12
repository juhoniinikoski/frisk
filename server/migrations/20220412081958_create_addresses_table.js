exports.up = function (knex) {
  return knex.schema.createTable('addresses', (table) => {
    table.text('id').primary()
    table.specificType('lat', 'double precision')
    table.specificType('lon', 'double precision')
    table.text('street')
    table.text('zipcode')
    table.text('city')
    table.text('country')
    table.timestamp('created_at')
    table.timestamp('updated_at')

    table.index('street')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('addresses')
}