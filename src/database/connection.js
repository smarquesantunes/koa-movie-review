import Knex from 'knex';
import { envs } from '../envs';
import path from 'path';

export const SQLITE_FILE_PATH = path.resolve(process.cwd(), envs.SQLITE_FILE_PATH);

export const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: SQLITE_FILE_PATH,
  },
  useNullAsDefault: true,
});
