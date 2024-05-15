import { TPostsRepository } from '../../repositories/PostsRepository/TPostsRepository';

export type TConstructor = {
  postsRepository: TPostsRepository;
};

export type TPostData = {
  title: string;
  description?: string;
  content: string;
};
