import CreatePostUseCase from '../CreatePostUseCase';

import { makePostgresHelper } from '../../helpers/factories/DatabaseHelper';

import PostsDatabaseRepository from '../../repositories/PostsRepository/PostsDatabaseRepository';

export function makeCreatePostUseCase() {
  const databaseHelper = makePostgresHelper();
  const postsRepository = new PostsDatabaseRepository({ databaseHelper });

  return new CreatePostUseCase({ postsRepository });
}
