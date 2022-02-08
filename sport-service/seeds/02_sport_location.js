exports.seed = await = (knex) => {
  return knex('sport_location').del()
    .then(function () {
      return knex('sport_location').insert([
        {
          location_id: 'Nordis1234',
          sport_id: '1'
        },
        {
          location_id: 'Nordis1234',
          sport_id: '2'
        },
        {
          location_id: 'Nordis1234',
          sport_id: '3'
        }
      ])
    })
}