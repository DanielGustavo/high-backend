import Post from '../../entities/Post';

import { TDatabaseHelper } from '../../helpers/DatabaseHelper/TDatabaseHelper';

export type TPostsRepository = {
  create: (postData: TCreatePost) => Promise<Post>;
  findById: (id: string) => Promise<Post | undefined>;
  deleteById: (id: string) => Promise<Post | undefined>;
};

export type TCreatePost = {
  title: string;
  description?: string;
  content: string;
  thumbnailFilename?: string;
  userId: string;
};

export type TConstructor = {
  databaseHelper: TDatabaseHelper;
};
