exports.seed = await = (knex) => {
  return knex('location_sport').del()
    .then(function () {
      return knex('location_sport').insert([
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
        },
        {
          location_id: 'Töölönlahti1234',
          sport_id: '1'
        },
        {
          location_id: 'Töölönlahti1234',
          sport_id: '2'
        }
      ])
    })
}