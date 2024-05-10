import { Request, Response } from 'express';

import { makeRegisterUserUseCase } from '../usecases/factories/registerUserUseCase';

import {
  authenticateValidator,
  registerValidator,
} from '../validators/usersValidators';
import { makeAuthenticateUserUseCase } from '../usecases/factories/authenticateUserUseCase';

class UsersController {
  async register(req: Request, res: Response) {
    await registerValidator.validate(req.body);

    const registerUserUseCase = makeRegisterUserUseCase();

    const { name, email, password, avatarFilename } = req.body;

    await registerUserUseCase.execute({
      name,
      email,
      password,
      avatarFilename,
    });

    res.json({ ok: true });
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
