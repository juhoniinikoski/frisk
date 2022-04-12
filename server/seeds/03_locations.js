const oneHour = 1000 * 60 * 60;

const createDateColumns = (date) => ({
  created_at: date,
  updated_at: date,
});

const createColumns = (locationName, addressId) => ({
  id: `${locationName}1234`,
  name: locationName,
  address_id: addressId,
  description: "Testilokaatio"
});

exports.seed = async (knex) => {
  await knex('locations').del();

  await knex('locations').insert([
    {
      ...createColumns('Ogeli', 'käskynhaltijantie11'),
      ...createDateColumns(new Date(Date.now() - oneHour))
    },
    {
      ...createColumns('Nordis', 'nordenskiöldinkatu1113'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour))
    },
    {
      ...createColumns('Myllypuro', 'alakiventie2'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
  ]);
};