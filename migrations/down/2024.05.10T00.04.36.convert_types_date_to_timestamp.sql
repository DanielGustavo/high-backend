-- down migration
ALTER TABLE users
  ALTER COLUMN created_at TYPE DATE,
  ALTER COLUMN updated_at TYPE DATE;

ALTER TABLE posts
  ALTER COLUMN created_at TYPE DATE,
  ALTER COLUMN deleted_at TYPE DATE,
  ALTER COLUMN updated_at TYPE DATE;

ALTER TABLE comments
  ALTER COLUMN created_at TYPE DATE,
  ALTER COLUMN deleted_at TYPE DATE,
  ALTER COLUMN updated_at TYPE DATE;
