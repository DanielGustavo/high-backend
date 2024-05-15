import { makePostgresHelper } from '../../helpers/factories/DatabaseHelper';

import PostsDatabaseRepository from '../../repositories/PostsRepository/PostsDatabaseRepository';

import UpdatePostUseCase from '../UpdatePostUseCase';

export function makeUpdatePostUseCase() {
  const databaseHelper = makePostgresHelper();
  const postsRepository = new PostsDatabaseRepository({ databaseHelper });

  return new UpdatePostUseCase({ postsRepository });
}
