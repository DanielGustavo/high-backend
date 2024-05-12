import { TPostsRepository } from '../../repositories/PostsRepository/TPostsRepository';

export type TConstructor = {
  postsRepository: TPostsRepository;
};

export type TProps = {
  search?: string;
  page: number;
  items: number;
};
