const oneHour = 1000 * 60 * 60;

const createDateColumns = (date) => ({
  created_at: date,
  updated_at: date,
});

const createColumns = (locationName) => ({
  id: `${locationName}1234`,
  name: locationName,
  description: "Testilokaatio",
  created_by_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
  street: 'Testitienpolku 1',
  zipcode: '00100',
  city: 'Helsinki',
  country: 'Finland'
});

exports.seed = async (knex) => {
  await knex('locations').del();

  await knex('locations').insert([
    {
      ...createColumns('Ogeli'),
      ...createDateColumns(new Date(Date.now() - oneHour))
    },
    {
      ...createColumns('Nordis'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour))
    },
    {
      ...createColumns('Myllypuro'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
  ]);
};