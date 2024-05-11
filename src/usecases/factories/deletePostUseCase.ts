import { makePostgresHelper } from '../../helpers/factories/DatabaseHelper';

import PostsDatabaseRepository from '../../repositories/PostsRepository/PostsDatabaseRepository';

import DeletePostUseCase from '../DeletePostUseCase';

export function makeDeletePostUseCase() {
  const databaseHelper = makePostgresHelper();
  const postsRepository = new PostsDatabaseRepository({ databaseHelper });

  return new DeletePostUseCase({ postsRepository });
}
