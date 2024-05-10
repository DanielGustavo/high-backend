import { TUsersRepository } from '../../repositories/UsersRepository/TUsersRepository';

import { THashHelper } from '../../helpers/HashHelper/THashHelper';
import { TTokenHelper } from '../../helpers/TokenHelper/TTokenHelper';

export type TCredentials = {
  email: string;
  password: string;
};

export type TConstructor = {
  usersRepository: TUsersRepository;
  hashHelper: THashHelper;
  tokenHelper: TTokenHelper;
};
