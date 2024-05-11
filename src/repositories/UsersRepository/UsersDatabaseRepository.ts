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
      SELECT
        id,
        name,
        email,
        password,
        avatar_filename as "avatarFilename",
        created_at as "createdAt",
        updated_at as "updatedAt"
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

  async create(userData: TCreateUser) {
    const rawSql = `
      INSERT INTO users
        (name, email, password, avatar_filename, created_at, updated_at)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING
        id,
        name,
        email,
        password,
        avatar_filename as "avatarFilename",
        created_at as "createdAt",
        updated_at as "updatedAt"
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
}
