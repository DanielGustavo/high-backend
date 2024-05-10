import { TConstructor, TCredentials } from './TAuthenticateUserUseCase';

import { TUsersRepository } from '../../repositories/UsersRepository/TUsersRepository';

import { THashHelper } from '../../helpers/HashHelper/THashHelper';
import { TTokenHelper } from '../../helpers/TokenHelper/TTokenHelper';

import EmailOrPasswordAreInvalid from '../errors/EmailOrPasswordAreInvalid';

import User from '../../entities/User';

export default class AuthenticateUserUseCase {
  constructor(props: TConstructor) {
    this.usersRepository = props.usersRepository;

    this.hashHelper = props.hashHelper;
    this.tokenHelper = props.tokenHelper;
  }

  private usersRepository: TUsersRepository;

  private hashHelper: THashHelper;
  private tokenHelper: TTokenHelper;

  async execute(credentials: TCredentials) {
    const user = await this.usersRepository.findByEmail(credentials.email);

    if (!user) throw EmailOrPasswordAreInvalid;

    const passwordIsCorrect = await this.hashHelper.compare(
      credentials.password,
      user.password
    );

    if (!passwordIsCorrect) throw EmailOrPasswordAreInvalid;

    const userData: Partial<User> = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarFilename: user.avatarFilename,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const token = this.tokenHelper.generateToken(userData);

    return token;
  }
}
