require('dotenv').config();

const { Umzug } = require('umzug');
const path = require('path');
const fs = require('fs');
const pg = require('pg');

const postgresClient = new pg.Client({
  database: process.env.DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),
  host: process.env.DB_HOST,
});

const getRawSqlClient = () => {
  return {
    query: (queryString, params) => postgresClient.query(queryString, params),
  };
};

const migrator = new Umzug({
  migrations: {
    glob: ['migrations/*.sql', { cwd: __dirname }],
    resolve(params) {
      const downPath = path.join(
        path.dirname(params.path),
        'down',
        path.basename(params.path)
      );

      return {
        name: params.name,
        path: params.path,
        up: async () => {
          params.context.query(fs.readFileSync(params.path).toString());
        },
        down: async () => {
          params.context.query(fs.readFileSync(downPath).toString());
        },
      };
    },
  },
  context: getRawSqlClient(),
  storage: {
    async executed({ context: client }) {
      await client.query(
        `CREATE TABLE IF NOT EXISTS my_migrations_table(name text)`
      );
      const { rows } = await client.query(
        `SELECT NAME FROM my_migrations_table`
      );

      return rows.map((r) => r.name);
    },
    async logMigration({ name, context: client }) {
      await client.query(`INSERT INTO my_migrations_table(name) VALUES ($1)`, [
        name,
      ]);
    },
    async unlogMigration({ name, context: client }) {
      await client.query(`DELETE FROM my_migrations_table WHERE name = $1`, [
        name,
      ]);
    },
  },
  logger: console,
  create: {
    folder: 'migrations',
  },
});

(async () => {
  await postgresClient.connect();
  await migrator.runAsCLI();
  await postgresClient.end();
})();
