import Post from '../../entities/Post';

import { TDatabaseHelper } from '../../helpers/DatabaseHelper/TDatabaseHelper';

import {
  TConstructor,
  TCreatePost,
  TPagination,
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
        RETURNING ${postsPropertiesSql}
      )
      SELECT
        inserted.*,
        JSON_BUILD_OBJECT(${usersPropertiesSql}) as user
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

  async findById(id: string) {
    const rawSql = `
      SELECT
        ${postsPropertiesSql},
        JSON_BUILD_OBJECT(${usersPropertiesSql}) as user
      FROM posts
      LEFT JOIN users ON users.id = posts.user_id
      WHERE posts.id = $1
      LIMIT 1
    `;

    const queryVariables = [id];

    const { rows } = await this.databaseHelper.query(rawSql, queryVariables);
    await this.databaseHelper.end();

    const post = rows[0];

    return post as Post | undefined;
  }

  async search(search: string, pagination: TPagination) {
    const rawSql = `
      WITH filtered AS (
        SELECT
          posts.*,
          JSON_BUILD_OBJECT(${usersPropertiesSql}) as user
        FROM posts
        LEFT JOIN users ON users.id = posts.user_id
        WHERE
          (
            posts.title ILIKE $1 OR
            posts.description ILIKE $1 OR
            posts.content ILIKE $1 OR
            users.name ILIKE $1
          ) AND
          (
            posts.deleted_at IS NULL AND
            posts.user_id IS NOT NULL
          )
        LIMIT $2 OFFSET $3
      )
      SELECT ${postsPropertiesSql}, posts.user FROM filtered posts
    `;

    const queryVariables = [
      `%${search}%`,
      pagination.items,
      pagination.items * (pagination.page - 1),
    ];

    const { rows } = await this.databaseHelper.query<Post>(
      rawSql,
      queryVariables
    );
    await this.databaseHelper.end();

    return rows;
  }

  async countAll(search?: string) {
    const rawSql = `
      WITH filtered AS (
        SELECT
          ${postsPropertiesSql}, posts.user_id,
          JSON_BUILD_OBJECT(${usersPropertiesSql}) as user
        FROM posts
        LEFT JOIN users ON users.id = posts.user_id
        WHERE
          (
            posts.title ILIKE $1 OR
            posts.description ILIKE $1 OR
            posts.content ILIKE $1 OR
            users.name ILIKE $1
          ) AND
          (
            posts.deleted_at IS NULL AND
            posts.user_id IS NOT NULL
          )
      )
      SELECT COUNT(filtered.*) as count FROM filtered;
    `;

    const queryVariables = [`%${search ?? ''}%`];

    const { rows } = await this.databaseHelper.query<{ count: string }>(
      rawSql,
      queryVariables
    );
    await this.databaseHelper.end();

    return Number(rows[0].count);
  }

  async deleteById(id: string) {
    const rawSql = `
      WITH updated AS (
        UPDATE posts
          SET deleted_at = $1
          WHERE id = $2
        RETURNING ${postsPropertiesSql}, posts.user_id
      )
      SELECT
        updated.*,
        JSON_BUILD_OBJECT(${usersPropertiesSql}) as user
      FROM updated LEFT JOIN users ON users.id = updated.user_id;
    `;

    const queryVariables = [new Date(), id];

    const { rows } = await this.databaseHelper.query(rawSql, queryVariables);
    await this.databaseHelper.end();

    const post = rows[0] as Post | undefined;

    if (post) Object.assign(post, { user_id: undefined });

    return post;
  }

  async update(newValue: Post) {
    const rawSql = `
      WITH updated AS (
        UPDATE posts
        SET
          title = $2,
          description = $3,
          content = $4,
          thumbnail_filename = $5,
          user_id = $6,
          updated_at = $7
        WHERE id = $1
        RETURNING ${postsPropertiesSql}
      )
      SELECT
        updated.*,
        JSON_BUILD_OBJECT(${usersPropertiesSql}) as user
      FROM updated LEFT JOIN users ON users.id = $6;
    `;

    const queryVariables = [
      newValue.id,
      newValue.title,
      newValue.description,
      newValue.content,
      newValue.thumbnail_filename,
      newValue.user?.id,
      new Date(),
    ];

    const { rows } = await this.databaseHelper.query(rawSql, queryVariables);
    await this.databaseHelper.end();

    const post = rows[0] as Post;

    return post;
  }
}

const postsPropertiesSql = `
  posts.id,
  posts.title,
  posts.description,
  posts.content,
  posts.thumbnail_filename as "thumbnailFilename",
  posts.created_at as "createdAt",
  posts.updated_at as "updatedAt",
  posts.deleted_at as "deletedAt"
`;

const usersPropertiesSql = `
  'id', users.id,
  'name', users.name,
  'email', users.email,
  'avatarFilename', users.avatar_filename,
  'createdAt', users.created_at,
  'updatedAt', users.updated_at
`;
