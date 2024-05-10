-- up migration
CREATE TABLE posts(
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  description VARCHAR,
  content VARCHAR NOT NULL,
  thumbnail_filename VARCHAR,
  user_id VARCHAR,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  deleted_at DATE,
  CONSTRAINT fk_post_of_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);
