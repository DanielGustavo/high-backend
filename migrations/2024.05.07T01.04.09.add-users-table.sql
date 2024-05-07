-- up migration
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  avatar_filename VARCHAR,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL
);
