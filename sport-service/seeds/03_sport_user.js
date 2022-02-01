exports.seed = await = (knex) => {
  return knex('sport_user').del()
    .then(function () {
      return knex('sport_user').insert([
        {
          user_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
          sport_id: '1'
        },
        {
          user_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
          sport_id: '3'
        }
      ])
    })
}