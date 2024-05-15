import User from '../../entities/User';

import { TCreateUser, TUsersRepository } from './TUsersRepository';

import { TDatabaseHelper } from '../../helpers/DatabaseHelper/TDatabaseHelper';

export default class UsersDatabaseRepository implements TUsersRepository {
  constructor(databaseHelper: TDatabaseHelper) {
    this.databaseHelper = databaseHelper;
  }

  private databaseHelper: TDatabaseHelper;

  async findByEmail(email: string) {
    const rawSql = `
      SELECT ${usersPropertiesSql}
      FROM users
      WHERE email = $1
      LIMIT 1
    `;

    const queryVariables = [email];

    const { rows } = await this.databaseHelper.query(rawSql, queryVariables);

    await this.databaseHelper.end();

    if (!rows[0]) {
      return undefined;
    }

    return rows[0] as User;
  }

  async findById(id: string) {
    const rawSql = `
      SELECT ${usersPropertiesSql}
      FROM users
      WHERE id = $1
      LIMIT 1
    `;

    const queryVariables = [id];

    const { rows } = await this.databaseHelper.query(rawSql, queryVariables);

    await this.databaseHelper.end();

    if (!rows[0]) {
      return undefined;
    }

    return rows[0] as User;
  }

  async create(userData: TCreateUser) {
    const rawSql = `
      INSERT INTO users
        (name, email, password, avatar_filename, created_at, updated_at)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING ${usersPropertiesSql}
    `;

    const currentTimestamp = new Date();
    const queryVariables = [
      userData.name,
      userData.email,
      userData.password,
      userData.avatarFilename,
      currentTimestamp,
      currentTimestamp,
    ];

    const { rows } = await this.databaseHelper.query(rawSql, queryVariables);
    await this.databaseHelper.end();

    return rows[0] as User;
  }

  async update(newValue: User) {
    const rawSql = `
      UPDATE users
      SET
        name = $2,
        email = $3,
        password = $4,
        avatar_filename = $5,
        updated_at = $6
      WHERE id = $1
      RETURNING ${usersPropertiesSql}
    `;

    const queryVariables = [
      newValue.id,
      newValue.name,
      newValue.email,
      newValue.password,
      newValue.avatarFilename,
      new Date(),
    ];

    const { rows } = await this.databaseHelper.query(rawSql, queryVariables);
    await this.databaseHelper.end();

    const post = rows[0] as User;

    return post;
  }
}

const usersPropertiesSql = `
  id,
  name,
  email,
  password,
  avatar_filename as "avatarFilename",
  created_at as "createdAt",
  updated_at as "updatedAt"
`;
