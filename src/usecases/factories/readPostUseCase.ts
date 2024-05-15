import ReadPostUseCase from '../ReadPostUseCase';

import { makePostgresHelper } from '../../helpers/factories/DatabaseHelper';

import PostsDatabaseRepository from '../../repositories/PostsRepository/PostsDatabaseRepository';

export function makeReadPostUseCase() {
  const databaseHelper = makePostgresHelper();
  const postsRepository = new PostsDatabaseRepository({ databaseHelper });

  return new ReadPostUseCase({ postsRepository });
}
