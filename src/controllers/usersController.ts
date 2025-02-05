import { Request, Response } from 'express';

import { makeRegisterUserUseCase } from '../usecases/factories/registerUserUseCase';
import { makeAuthenticateUserUseCase } from '../usecases/factories/authenticateUserUseCase';
import { makeChangeUserAvatarUseCase } from '../usecases/factories/changeUserAvatarUseCase';

import {
  authenticateValidator,
  registerValidator,
} from '../validators/usersValidators';

import { makeJWTHelper } from '../helpers/factories/TokenHelper';
import { TTokenPayload } from '../shared/types/TTokenPayload';

const tokenHelper = makeJWTHelper();

class UsersController {
  async register(req: Request, res: Response) {
    await registerValidator.validate(req.body);
    const registerUserUseCase = makeRegisterUserUseCase();

    const { name, email, password, avatarFilename } = req.body;

    const user = await registerUserUseCase.execute({
      name,
      email,
      password,
      avatarFilename,
    });

    res.json({ user });
  }

  async authenticate(req: Request, res: Response) {
    await authenticateValidator.validate(req.body);

    const authenticateUserUseCase = makeAuthenticateUserUseCase();
    const { email, password } = req.body;
    const token = await authenticateUserUseCase.execute({ email, password });

    res.json({ token });
  }

  async changeAvatar(req: Request, res: Response) {
    const authToken = req.headers.authorization as string;
    const user = tokenHelper.decode<TTokenPayload>(authToken, true);

    const changeUserAvatarUseCase = makeChangeUserAvatarUseCase();

    const newUserState = await changeUserAvatarUseCase.execute({
      userId: user.id,
      filename: req.file?.filename as string,
    });

    res.json({ user: newUserState });
  }
}

export default new UsersController();
