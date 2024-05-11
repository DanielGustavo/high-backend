import { TPostsRepository } from '../../repositories/PostsRepository/TPostsRepository';

export type TConstructor = {
  postsRepository: TPostsRepository;
};

export type TPostData = {
  id: string;
  title?: string;
  description?: string;
  content?: string;
};
