import pg from 'pg';

import databaseConfig from '../../config/database';

import PostgresHelper from '../DatabaseHelper/PostgresHelper';

const pool = new pg.Pool(databaseConfig);

pool.on('error', (err) => {
  console.error('🎲 Unexpected error on Postgres pool: ', err);
});

export function makePostgresHelper() {
  return new PostgresHelper(pool);
}
