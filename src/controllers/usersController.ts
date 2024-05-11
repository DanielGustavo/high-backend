import { Request, Response } from 'express';

import { makeRegisterUserUseCase } from '../usecases/factories/registerUserUseCase';
import { makeAuthenticateUserUseCase } from '../usecases/factories/authenticateUserUseCase';

import {
  authenticateValidator,
  registerValidator,
} from '../validators/usersValidators';

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
}

export default new UsersController();
