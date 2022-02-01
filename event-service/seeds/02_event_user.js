exports.seed = await = (knex) => {
  return knex('event_user').del()
    .then(function () {
      return knex('event_user').insert([
        {
          event_id: 'juhoniinikoski.Pihapelit',
          user_id: 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2'
        },
        {
          event_id: 'juhoniinikoski.Pihapelit2',
          user_id: 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2'
        },
        {
          event_id: 'juhoniinikoski.Ulkokoris',
          user_id: 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2'
        },
      ])
    })
}