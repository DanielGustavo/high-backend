import {
  TConstructor,
  TUserData,
} from './TRegisterUserUseCase';

import { TUsersRepository } from '../../repositories/UsersRepository/TUsersRepository';

import { THashHelper } from '../../helpers/HashHelper/THashHelper';

import EmailIsAlreadyInUseByAUser from '../errors/EmailIsAlreadyInUseByAUser';

export default class RegisterUserUseCase {
  constructor(props: TConstructor) {
    this.usersRepository = props.usersRepository;
    this.hashHelper = props.hashHelper;
  }

  private usersRepository: TUsersRepository;
  private hashHelper: THashHelper;

  async execute(userData: TUserData) {
    const emailIsAlreadyInUse = !!(await this.usersRepository.findByEmail(
      userData.email
    ));

    if (emailIsAlreadyInUse) {
      throw EmailIsAlreadyInUseByAUser;
    }

    const passwordHash = await this.hashHelper.hash(userData.password, 7);

    await this.usersRepository.create({
      name: userData.name,
      email: userData.email,
      password: passwordHash,
      avatarFilename: userData.avatarFilename,
    });
  }
}
