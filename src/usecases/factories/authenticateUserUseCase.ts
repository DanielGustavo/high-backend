import AuthenticateUserUseCase from '../AuthenticateUserUseCase';

import { makeUsersPostgresRepository } from '../../repositories/factories/UsersRepository';

import BcryptHelper from '../../helpers/HashHelper/BcryptHelper';
import { makeJWTHelper } from '../../helpers/factories/TokenHelper';

export function makeAuthenticateUserUseCase() {
  const usersRepository = makeUsersPostgresRepository();

  const tokenHelper = makeJWTHelper();
  const hashHelper = new BcryptHelper();

  return new AuthenticateUserUseCase({
    usersRepository,
    tokenHelper,
    hashHelper,
  });
}
