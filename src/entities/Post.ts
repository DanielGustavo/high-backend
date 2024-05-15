import User from './User';

export default interface Post {
  id: string;
  title: string;
  description?: string;
  content: string;
  thumbnailFilename?: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
