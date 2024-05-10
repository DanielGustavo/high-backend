import { THashHelper } from '../../helpers/HashHelper/THashHelper';
import { TUsersRepository } from '../../repositories/UsersRepository/TUsersRepository';

export type TUserData = {
  name: string;
  email: string;
  password: string;
  avatarFilename?: string;
};

export type TConstructor = {
  usersRepository: TUsersRepository;
  hashHelper: THashHelper;
};
