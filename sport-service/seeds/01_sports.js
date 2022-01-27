const createColumns = (id, sportTitle) => ({
  id: id,
  name: `${sportTitle}`,
  created_by_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c'
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