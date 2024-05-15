import ChangeUserAvatarUseCase from '../ChangeUserAvatarUseCase';

import { makePostgresHelper } from '../../helpers/factories/DatabaseHelper';
import LocalUploadsStorageHelper from '../../helpers/StorageHelper/LocalUploadsStorageHelper';

import UsersDatabaseRepository from '../../repositories/UsersRepository/UsersDatabaseRepository';

export function makeChangeUserAvatarUseCase() {
  const databaseHelper = makePostgresHelper();
  const usersRepository = new UsersDatabaseRepository(databaseHelper);

  const storageHelper = new LocalUploadsStorageHelper();

  return new ChangeUserAvatarUseCase({ usersRepository, storageHelper });
}
