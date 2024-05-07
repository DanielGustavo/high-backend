-- up migration
CREATE TABLE comments(
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR NOT NULL,
  post_id VARCHAR NOT NULL,
  content VARCHAR NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  deleted_at DATE,
  CONSTRAINT fk_comment_of_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET NULL,
  CONSTRAINT fk_comment_in_post
    FOREIGN key(post_id)
    REFERENCES posts(id)
    ON DELETE SET NULL
);
