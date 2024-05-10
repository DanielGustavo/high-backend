export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarFilename?: string;
  createdAt: Date;
  updatedAt: Date;
}
