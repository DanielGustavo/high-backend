import { TConstructor, TProps } from './TChangeUserAvatarUseCase';

import { TStorageHelper } from '../../helpers/StorageHelper/TStorageHelper';

import { TUsersRepository } from '../../repositories/UsersRepository/TUsersRepository';

import UserDoesntExist from '../errors/UserDoesntExist';

export default class ChangeUserAvatarUseCase {
  constructor({ storageHelper, usersRepository }: TConstructor) {
    this.storageHelper = storageHelper;
    this.usersRepository = usersRepository;
  }

  private storageHelper: TStorageHelper;

  private usersRepository: TUsersRepository;

  async execute({ filename, userId }: TProps) {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw UserDoesntExist;

    if (user.avatarFilename) {
      await this.storageHelper.removeFile(user.avatarFilename);
    }

    user.avatarFilename = filename;

    const newUserState = await this.usersRepository.update(user);
    Object.assign(newUserState, { password: undefined });

    return newUserState;
  }
}
