import Post from '../../entities/Post';

import { TDatabaseHelper } from '../../helpers/DatabaseHelper/TDatabaseHelper';

export type TPostsRepository = {
  create: (postData: TCreatePost) => Promise<Post>;
  findById: (id: string) => Promise<Post | undefined>;
  search: (search: string, pagiation: TPagination) => Promise<Post[]>;
  countAll: (search?: string) => Promise<number>;
  deleteById: (id: string) => Promise<Post | undefined>;
  update: (newValue: Post) => Promise<Post>;
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

export type TPagination = {
  page: number;
  items: number;
};
