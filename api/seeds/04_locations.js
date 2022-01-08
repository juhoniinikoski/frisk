const oneHour = 1000 * 60 * 60;

const createDateColumns = (date) => ({
  created_at: date,
  updated_at: date,
});

const createColumns = (locationName) => ({
  id: `${locationName}1234`,
  name: locationName,
  location_description: "Testilokaatio",
  sport_id: ['1', '2', '4'],
  address: JSON.stringify(
    {
      id: 1,
      street: 'Testitienpolku 1',
      zipcode: '00100',
      city: 'Helsinki',
      country: 'Finland'
    }
  ),
});

exports.seed = async (knex) => {
  await knex('locations').del();

  await knex('locations').insert([
    {
      ...createColumns('Oulunkylän urheilupuisto'),
      ...createDateColumns(new Date(Date.now() - oneHour))
    },
    {
      ...createColumns('Nordis'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour))
    },
    {
      ...createColumns('Töölönlahti'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
  ]);
};