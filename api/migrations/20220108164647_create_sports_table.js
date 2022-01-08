exports.up = function (knex) {
  return knex.schema.createTable('sports', (table) => {
    table.text('id').primary()
    table.text('name').unique()

    table.index('name')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('sports')
}