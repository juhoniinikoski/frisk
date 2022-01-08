
const createColumns = (id, sportTitle) => ({
  id: id,
  name: `${sportTitle}`
});

exports.seed = async (knex) => {
  await knex('sports').del();

  await knex('sports').insert([
    {
      ...createColumns('1', 'Sähly')
    },
    {
      ...createColumns('2', 'Lätkä')
    },
    {
      ...createColumns('3', 'Futis')
    },
    {
      ...createColumns('4', 'Koris')
    },
  ]);
};