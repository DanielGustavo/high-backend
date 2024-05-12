import { Request, Response } from 'express';

import { makeCreatePostUseCase } from '../usecases/factories/createPostUseCase';
import { makeReadPostUseCase } from '../usecases/factories/readPostUseCase';
import { makeDeletePostUseCase } from '../usecases/factories/deletePostUseCase';
import { makeUpdatePostUseCase } from '../usecases/factories/updatePostUseCase';
import { makeListPostsUseCase } from '../usecases/factories/listPostsUseCase';

import { makeJWTHelper } from '../helpers/factories/TokenHelper';

import { TTokenPayload } from '../shared/types/TTokenPayload';

import {
  createValidator,
  deleteValidator,
  findOneValidator,
  listValidator,
  updateValidator,
} from '../validators/postsValidators';

const tokenHelper = makeJWTHelper();

class PostsController {
  async create(req: Request, res: Response) {
    await createValidator.validate(req.body);

    const { title, content, description } = req.body;

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

  async list(req: Request, res: Response) {
    await listValidator.validate(req.query);
    const { search, page, items } = req.query;

    const listPostsUseCase = makeListPostsUseCase();
    const { posts, totalLength } = await listPostsUseCase.execute({
      search: String(search ?? ''),
      page: Number(page),
      items: Number(items ?? 15),
    });

    res.json({ posts, totalLength });
  }

  async delete(req: Request, res: Response) {
    await deleteValidator.validate(req.params);
    const { postId } = req.params;

    const authToken = req.headers.authorization as string;
    const user = tokenHelper.decode<TTokenPayload>(authToken, true);

    const deletePostUseCase = makeDeletePostUseCase();
    const post = await deletePostUseCase.execute({ postId, userId: user.id });

    res.json({ post });
  }

  async update(req: Request, res: Response) {
    await updateValidator.validate(req.params, req.body);

    const { postId } = req.params;
    const { title, description, content } = req.body;

    const authToken = req.headers.authorization as string;
    const user = tokenHelper.decode<TTokenPayload>(authToken, true);

    const updatePostUseCase = makeUpdatePostUseCase();
    const post = await updatePostUseCase.execute(user.id, {
      id: postId,
      title,
      description,
      content,
    });

    res.json({ post });
  }
}

export default new PostsController();
