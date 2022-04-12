exports.up = function (knex) {
  return knex.schema.createTable('activities', (table) => {
    table.text('id').primary()
    table.text('name').unique()
    table.timestamp('created_at')
    table.timestamp('updated_at')

    table.index('name')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('activities')
}