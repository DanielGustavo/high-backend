import ListPostsUseCase from '../ListPostsUseCase';

import { makePostgresHelper } from '../../helpers/factories/DatabaseHelper';

import PostsDatabaseRepository from '../../repositories/PostsRepository/PostsDatabaseRepository';

export function makeListPostsUseCase() {
  const databaseHelper = makePostgresHelper();
  const postsRepository = new PostsDatabaseRepository({ databaseHelper });

  return new ListPostsUseCase({ postsRepository });
}
