const { camelCase } = require('lodash')

const oneHour = 1000 * 60 * 60;

const createDateColumns = (date) => ({
  created_at: date,
  updated_at: date,
});

const createColumns = (street, zipcode, latitude, longitude) => ({
  id: camelCase(street),
  lat: latitude,
  lon: longitude,
  street: street,
  zipcode: zipcode,
  city: 'Helsinki',
  country: 'Finland'
});

exports.seed = async (knex) => {
  await knex('addresses').del();

  await knex('addresses').insert([
    {
      ...createColumns('Käskynhaltijantie 11', '00640', 60.233598, 24.961252),
      ...createDateColumns(new Date(Date.now() - oneHour))
    },
    {
      ...createColumns('Nordenskiöldinkatu 11-13', '00250', 60.189622, 24.921230),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour))
    },
    {
      ...createColumns('Alakiventie 2', '00920', 60.221045, 25.079082),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
  ]);
};