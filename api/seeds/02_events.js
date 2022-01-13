const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

const createColumns = (ownerName, eventTitle) => ({
  id: `${ownerName}.${eventTitle}`,
  user_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
  event_description: 'Testitapahtuma',
  event_title: eventTitle,
  location_id: 'Töölönlahti1234',
  sport_id: '4',
  repetition: 'SINGLE',
  free: true,
  price: 0.00,
  start: new Date(1641657600000),
  end: new Date(1641664800000)
})

exports.seed = async knex => {
  await knex('events').del();

  await knex('events').insert([
    {
      ...createColumns('juhoniinikoski', 'Pihapelit'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createColumns('juhoniinikoski', 'Pihapelit2'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createColumns('juhoniinikoski', 'Ulkokoris'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('juhoniinikoski', 'Katulätkä'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
  ]);
};