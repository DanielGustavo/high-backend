import UsersDatabaseRepository from '../../repositories/UsersRepository/UsersDatabaseRepository';

import PostgresHelper from '../../helpers/DatabaseHelper/PostgresHelper';

export function makeUsersPostgresRepository() {
  const postgresHelper = new PostgresHelper();

  return new UsersDatabaseRepository(postgresHelper);
}
