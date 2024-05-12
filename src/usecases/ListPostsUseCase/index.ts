import { TConstructor, TProps } from './TListPostsUseCase';

import { TPostsRepository } from '../../repositories/PostsRepository/TPostsRepository';

export default class ListPostsUseCase {
  constructor({ postsRepository }: TConstructor) {
    this.postsRepository = postsRepository;
  }

  private postsRepository: TPostsRepository;

  async execute({ search, items, page }: TProps) {
    const posts = await this.postsRepository.search(search ?? '', {
      page,
      items,
    });

    const totalLength = await this.postsRepository.countAll(search ?? '');

    return { posts, totalLength };
  }
}
