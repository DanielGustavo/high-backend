import { TConstructor, TProps } from './TChangePostThumbnailUseCase';

import { TStorageHelper } from '../../helpers/StorageHelper/TStorageHelper';

import { TPostsRepository } from '../../repositories/PostsRepository/TPostsRepository';

import PostDoesntExist from '../errors/PostDoesntExist';
import HasNoPermissionToEditThisPost from '../errors/HasNoPermissionToEditThisPost';

export default class ChangePostThumbnailUseCase {
  constructor({ storageHelper, postsRepository }: TConstructor) {
    this.storageHelper = storageHelper;
    this.postsRepository = postsRepository;
  }

  private storageHelper: TStorageHelper;
  private postsRepository: TPostsRepository;

  async execute({ postId, filename, userId }: TProps) {
    const post = await this.postsRepository.findById(postId);

    if (!post || post.deletedAt) throw PostDoesntExist;

    if (!post.user || post.user.id !== userId) {
      throw HasNoPermissionToEditThisPost;
    }

    if (post.thumbnailFilename) {
      await this.storageHelper.removeFile(post.thumbnailFilename);
    }

    post.thumbnailFilename = filename;
    const newPostState = await this.postsRepository.update(post);

    return newPostState;
  }
}
