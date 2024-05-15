import { TStorageHelper } from '../../helpers/StorageHelper/TStorageHelper';

import { TUsersRepository } from '../../repositories/UsersRepository/TUsersRepository';

export type TProps = {
  filename: string;
  userId: string;
};

export type TConstructor = {
  storageHelper: TStorageHelper;
  usersRepository: TUsersRepository;
};
