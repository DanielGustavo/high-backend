import User from './User';

export default interface Post {
  id: string;
  title: string;
  description?: string;
  content: string;
  thumbnail_filename?: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
