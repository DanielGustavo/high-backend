export default {
  database: process.env.DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),
  host: process.env.DB_PORT,
};
