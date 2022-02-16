exports.seed = await = (knex) => {
  return knex('location_activity').del()
    .then(function () {
      return knex('location_activity').insert([
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