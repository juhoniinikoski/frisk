const createColumns = (id, activityTitle) => ({
  id: id,
  name: `${activityTitle}`,
  created_by_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
  created_at: new Date()
});

exports.seed = async (knex) => {
  await knex('activities').del();

  await knex('activities').insert([
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