const createColumns = (id, activityTitle) => ({
  id: id,
  name: `${activityTitle}`,
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