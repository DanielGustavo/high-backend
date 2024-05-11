import { Request, Response } from 'express';

import { makeCreatePostUseCase } from '../usecases/factories/createPostUseCase';

import { makeJWTHelper } from '../helpers/factories/TokenHelper';

import { TTokenPayload } from '../shared/types/TTokenPayload';

import { createValidator } from '../validators/postsValidators';

class PostsController {
  async create(req: Request, res: Response) {
    await createValidator.validate(req.body);

    const { title, content, description } = req.body;

    const tokenHelper = makeJWTHelper();
    const createPostsUseCase = makeCreatePostUseCase();

    const authToken = req.headers.authorization as string;
    const user = tokenHelper.decode<TTokenPayload>(authToken, true);

    const post = await createPostsUseCase.execute(
      {
        title,
        content,
        description,
      },
      user.id
    );

    res.json({ post });
  }
}

export default new PostsController();
