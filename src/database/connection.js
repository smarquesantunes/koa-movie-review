import Knex from 'knex';
import { envs } from '../envs';

export const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: envs.SQLITE_FILE_PATH,
  },
  useNullAsDefault: true,
});
