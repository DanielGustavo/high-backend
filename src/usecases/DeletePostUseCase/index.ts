import { TConstructor, TParams } from './TDeletePostUseCase';

import { TPostsRepository } from '../../repositories/PostsRepository/TPostsRepository';

import PostDoesntExist from '../errors/PostDoesntExist';
import HasNoPermissionToDeleteThisPost from '../errors/HasNoPermissionToDeleteThisPost';

export default class DeletePostUseCase {
  constructor({ postsRepository }: TConstructor) {
    this.postsRepository = postsRepository;
  }

  private postsRepository: TPostsRepository;

  async execute({ postId, userId }: TParams) {
    const post = await this.postsRepository.findById(postId);

    if (post?.deletedAt || !post) {
      throw PostDoesntExist;
    }

    if (post.user?.id !== userId || !post.user?.id) {
      throw HasNoPermissionToDeleteThisPost;
    }

    return this.postsRepository.deleteById(postId);
  }
}
