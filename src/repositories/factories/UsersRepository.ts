import UsersDatabaseRepository from '../../repositories/UsersRepository/UsersDatabaseRepository';

import { makePostgresHelper } from '../../helpers/factories/DatabaseHelper';

export function makeUsersPostgresRepository() {
  const postgresHelper = makePostgresHelper();

  return new UsersDatabaseRepository(postgresHelper);
}
