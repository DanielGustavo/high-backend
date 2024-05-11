import { Request, Response } from 'express';

import { makeCreatePostUseCase } from '../usecases/factories/createPostUseCase';
import { makeReadPostUseCase } from '../usecases/factories/readPostUseCase';

import { makeJWTHelper } from '../helpers/factories/TokenHelper';

import { TTokenPayload } from '../shared/types/TTokenPayload';

import {
  createValidator,
  findOneValidator,
} from '../validators/postsValidators';

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

  async findOne(req: Request, res: Response) {
    await findOneValidator.validate(req.params);
    const { postId } = req.params;

    const readPostUseCase = makeReadPostUseCase();
    const post = await readPostUseCase.execute(postId);

    res.json({ post });
  }
}

export default new PostsController();
