import RegisterUserUseCase from '../../usecases/RegisterUserUseCase';

import { makeUsersPostgresRepository } from '../../repositories/factories/UsersRepository';

import BcryptHelper from '../../helpers/HashHelper/BcryptHelper';

export function makeRegisterUserUseCase() {
  const usersRepository = makeUsersPostgresRepository();

  const hashHelper = new BcryptHelper();

  return new RegisterUserUseCase({ usersRepository, hashHelper });
}
