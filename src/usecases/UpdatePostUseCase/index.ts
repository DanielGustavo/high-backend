import { TConstructor, TPostData } from './TUpdatePostUseCase';

import { TPostsRepository } from '../../repositories/PostsRepository/TPostsRepository';

import PostDoesntExist from '../errors/PostDoesntExist';
import HasNoPermissionToEditThisPost from '../errors/HasNoPermissionToEditThisPost';

export default class UpdatePostUseCase {
  constructor({ postsRepository }: TConstructor) {
    this.postsRepository = postsRepository;
  }

  private postsRepository: TPostsRepository;

  async execute(userId: string, postData: TPostData) {
    const post = await this.postsRepository.findById(postData.id);

    if (post?.deletedAt || !post) {
      throw PostDoesntExist;
    }

    if (userId !== post.user?.id || !post.user?.id) {
      throw HasNoPermissionToEditThisPost;
    }

    Object.entries(postData).forEach(([key, value]) => {
      if (value === undefined) return;

      post[key as keyof TPostData] = value;
    });

    const updatedPost = await this.postsRepository.update(post);

    return updatedPost;
  }
}
