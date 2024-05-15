import { TConstructor } from './TReadPostUseCase';

import { TPostsRepository } from '../../repositories/PostsRepository/TPostsRepository';

import PostDoesntExist from '../errors/PostDoesntExist';

export default class ReadPostUseCase {
  constructor({ postsRepository }: TConstructor) {
    this.postsRepository = postsRepository;
  }

  private postsRepository: TPostsRepository;

  async execute(postId: string) {
    const post = await this.postsRepository.findById(postId);

    if (post?.deletedAt || !post) {
      throw PostDoesntExist;
    }

    return post;
  }
}
