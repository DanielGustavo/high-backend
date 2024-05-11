import Post from '../../entities/Post';

import { TDatabaseHelper } from '../../helpers/DatabaseHelper/TDatabaseHelper';

import {
  TConstructor,
  TCreatePost,
  TPostsRepository,
} from './TPostsRepository';

export default class PostsDatabaseRepository implements TPostsRepository {
  constructor({ databaseHelper }: TConstructor) {
    this.databaseHelper = databaseHelper;
  }

  private databaseHelper: TDatabaseHelper;

  async create(postData: TCreatePost) {
    const rawSql = `
      WITH inserted AS (
        INSERT INTO posts
          (title, description, content, thumbnail_filename, user_id, created_at, updated_at)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
          id,
          title,
          description,
          content,
          thumbnail_filename as "thumbnailFilename",
          created_at as "createdAt",
          updated_at as "updatedAt",
          deleted_at as "deletedAt"
      )
      SELECT
        inserted.*,
        JSON_BUILD_OBJECT(
          'id', users.id,
          'name', users.name,
          'email', users.email,
          'avatarFilename', users.avatar_filename,
          'createdAt', users.created_at,
          'updatedAt', users.updated_at
        ) as user
      FROM inserted LEFT JOIN users ON users.id = $5;
    `;

    const currentDate = new Date();
    const queryVariables = [
      postData.title,
      postData.description,
      postData.content,
      postData.thumbnailFilename,
      postData.userId,
      currentDate,
      currentDate,
    ];

    const { rows } = await this.databaseHelper.query(rawSql, queryVariables);
    await this.databaseHelper.end();

    return rows[0] as Post;
  }
}
