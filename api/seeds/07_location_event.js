exports.seed = await = (knex) => {
  return knex('location_event').del()
    .then(function () {
      return knex('location_event').insert([
        {
          location_id: 'Nordis1234',
          event_id: 'juhoniinikoski.Pihapelit'
        },
        {
          location_id: 'Nordis1234',
          event_id: 'juhoniinikoski.Katulätkä'
        },
        {
          location_id: 'Töölönlahti1234',
          event_id: 'juhoniinikoski.Pihapelit'
        },
        {
          location_id: 'Töölönlahti1234',
          event_id: 'juhoniinikoski.Pihapelit2'
        },
        {
          location_id: 'Nordis1234',
          event_id: 'juhoniinikoski.Pihapelit'
        }
      ])
    })
}