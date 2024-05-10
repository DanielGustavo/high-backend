import pg from 'pg';

import { TDatabaseHelper } from './TDatabaseHelper';

export default class PostgresHelper implements TDatabaseHelper {
  private client?: pg.PoolClient;
  private pool: pg.Pool;

  constructor(pool: pg.Pool) {
    this.pool = pool;
  }

  async query<T = unknown>(queryString: string, params?: unknown[]) {
    this.client = await this.pool.connect();

    const res = await this.client.query(queryString, params);

    return { rows: res.rows as T[], rowCount: res.rowCount || 0 };
  }

  async end() {
    this.client?.release();
  }
}
