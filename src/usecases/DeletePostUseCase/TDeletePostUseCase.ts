import { TPostsRepository } from '../../repositories/PostsRepository/TPostsRepository';

export type TConstructor = {
  postsRepository: TPostsRepository;
};

export type TParams = {
  postId: string;
  userId: string;
};
