import { Request, Response } from 'express';

import { makeRegisterUserUseCase } from '../usecases/factories/registerUserUseCase';

import { registerValidator } from '../validators/usersValidators';

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
}

export default new UsersController();
