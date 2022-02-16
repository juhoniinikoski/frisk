exports.seed = await = (knex) => {
  return knex('activity_location').del()
    .then(function () {
      return knex('activity_location').insert([
        {
          location_id: 'Nordis1234',
          activity_id: '1'
        },
        {
          location_id: 'Nordis1234',
          activity_id: '2'
        },
        {
          location_id: 'Nordis1234',
          activity_id: '3'
        }
      ])
    })
}