import ChangePostThumbnailUseCase from '../ChangePostThumbnailUseCase';

import { makePostgresHelper } from '../../helpers/factories/DatabaseHelper';
import LocalUploadsStorageHelper from '../../helpers/StorageHelper/LocalUploadsStorageHelper';

import PostsDatabaseRepository from '../../repositories/PostsRepository/PostsDatabaseRepository';

export function makeChangePostThumbnailUseCase() {
  const databaseHelper = makePostgresHelper();
  const postsRepository = new PostsDatabaseRepository({ databaseHelper });

  const storageHelper = new LocalUploadsStorageHelper();

  return new ChangePostThumbnailUseCase({
    postsRepository,
    storageHelper,
  });
}
