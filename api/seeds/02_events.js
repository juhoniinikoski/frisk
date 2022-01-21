const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

const createColumns = (ownerName, eventTitle, createdBy) => ({
  id: `${ownerName}.${eventTitle}`,
  created_by_id: createdBy,
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
      ...createColumns('juhoniinikoski', 'Pihapelit', 'bbe42984-051b-4a01-b45d-b8d29c32200c'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createColumns('juhoniinikoski', 'Pihapelit2', 'bbe42984-051b-4a01-b45d-b8d29c32200c'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createColumns('juhoniinikoski', 'Ulkokoris', 'bbe42984-051b-4a01-b45d-b8d29c32200c'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('juhoniinikoski', 'Katulätkä', 'bbe42984-051b-4a01-b45d-b8d29c32200c'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('johndoe', 'Testievent', '9b9d927e-2ee9-4f93-b96b-c8f677c63a5f'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
  ]);
};