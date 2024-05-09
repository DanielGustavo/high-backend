import User from '../../entities/User';

export type TUsersRepository = {
  findByEmail: (email: string) => Promise<User | undefined>;
  create: (userData: TCreateUser) => Promise<User>;
};

export type TCreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
