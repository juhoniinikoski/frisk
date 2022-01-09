const FILENAME = process.env.DATABASE_FILENAME || 'database.sqlite';

export default {
  client: 'sqlite3',
  connection: {
    filename: FILENAME,
  },
  useNullAsDefault: true,
};