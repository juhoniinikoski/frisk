exports.seed = await = (knex) => {
  return knex('location_user').del()
    .then(function () {
      return knex('location_user').insert([
        {
          location_id: 'Nordis1234',
          user_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c'
        },
        {
          location_id: 'Ogeli1234',
          user_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c'
        }
      ])
    })
}