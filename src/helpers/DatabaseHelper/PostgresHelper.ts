import pg from 'pg';

import { TDatabaseHelper } from './TDatabaseHelper';

import databaseConfig from '../../config/database';

const pool = new pg.Pool(databaseConfig);

pool.on('error', (err) => {
  console.error('🎲 Unexpected error on Postgres pool: ', err);
});

export default class PostgresHelper implements TDatabaseHelper {
  private client?: pg.PoolClient;

  async query<T = unknown>(queryString: string, params?: unknown[]) {
    this.client = await pool.connect();

    const res = await this.client.query(queryString, params);

    return { rows: res.rows as T[], rowCount: res.rowCount || 0 };
  }

  async end() {
    this.client?.release();
  }
}
