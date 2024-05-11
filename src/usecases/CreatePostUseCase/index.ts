import { TConstructor, TPostData } from './TCreatePostUseCase';

import { TPostsRepository } from '../../repositories/PostsRepository/TPostsRepository';

export default class CreatePostUseCase {
  constructor({ postsRepository }: TConstructor) {
    this.postsRepository = postsRepository;
  }

  private postsRepository: TPostsRepository;

  async execute(postData: TPostData, userId: string) {
    const post = await this.postsRepository.create({
      title: postData.title,
      userId: userId,
      content: postData.content,
      description: postData.description,
    });

    return post;
  }
}
