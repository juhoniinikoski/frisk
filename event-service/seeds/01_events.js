const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

const createColumns = (ownerName, eventTitle, createdBy, sportId, sportName) => ({
  id: `${ownerName}.${eventTitle}`,
  created_by_id: createdBy,
  created_by_name: ownerName,
  sport_name: sportName,
  description: 'Testitapahtuma',
  name: eventTitle,
  location_id: 'Nordis1234',
  location_name: 'Nordis',
  sport_id: sportId,
  repetition: 'SINGLE',
  free: true,
  price: 0.00,
  start: new Date(Date.now() - 2 * oneHour),
  end: new Date(Date.now())
})

exports.seed = async knex => {
  await knex('events').del();

  await knex('events').insert([
    {
      ...createColumns('juhoniinikoski', 'Pihapelit', 'bbe42984-051b-4a01-b45d-b8d29c32200c', '1', 'Sähly'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createColumns('juhoniinikoski', 'Pihapelit2', 'bbe42984-051b-4a01-b45d-b8d29c32200c', '2', 'Lätkä'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createColumns('juhoniinikoski', 'Ulkokoris', 'bbe42984-051b-4a01-b45d-b8d29c32200c', '3', 'Futis'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('juhoniinikoski', 'Katulätkä', 'bbe42984-051b-4a01-b45d-b8d29c32200c', '1', 'Sähly'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('johndoe', 'Testievent', '9b9d927e-2ee9-4f93-b96b-c8f677c63a5f', '1', 'Sähly'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
  ]);
};