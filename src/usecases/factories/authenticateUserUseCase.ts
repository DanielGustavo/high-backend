import AuthenticateUserUseCase from '../AuthenticateUserUseCase';

import { makeUsersPostgresRepository } from '../../repositories/factories/UsersRepository';

import JWTHelper from '../../helpers/TokenHelper/JWTHelper';
import BcryptHelper from '../../helpers/HashHelper/BcryptHelper';

export function makeAuthenticateUserUseCase() {
  const usersRepository = makeUsersPostgresRepository();

  const tokenHelper = new JWTHelper();
  const hashHelper = new BcryptHelper();

  return new AuthenticateUserUseCase({
    usersRepository,
    tokenHelper,
    hashHelper,
  });
}
