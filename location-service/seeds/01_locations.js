const oneHour = 1000 * 60 * 60;

const createDateColumns = (date) => ({
  created_at: date,
  updated_at: date,
});

const createColumns = (locationName, latitude, longitude) => ({
  id: `${locationName}1234`,
  name: locationName,
  latitude: latitude,
  longitude: longitude,
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
      ...createColumns('Ogeli', 60.233720, 24.964560),
      ...createDateColumns(new Date(Date.now() - oneHour))
    },
    {
      ...createColumns('Nordis', 60.188969, 24.919491),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour))
    },
    {
      ...createColumns('Myllypuro', 60.214850, 25.079910),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
  ]);
};