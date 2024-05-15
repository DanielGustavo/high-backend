import { TPostsRepository } from '../../repositories/PostsRepository/TPostsRepository';

import { TStorageHelper } from '../../helpers/StorageHelper/TStorageHelper';

export type TProps = {
  filename: string;
  postId: string;
  userId: string;
};

export type TConstructor = {
  storageHelper: TStorageHelper;
  postsRepository: TPostsRepository;
};
