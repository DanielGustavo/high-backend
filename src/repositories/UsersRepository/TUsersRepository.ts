import User from '../../entities/User';

export type TUsersRepository = {
  findByEmail: (email: string) => Promise<User | undefined>;
  findById: (id: string) => Promise<User | undefined>;
  create: (userData: TCreateUser) => Promise<User>;
  update: (newValue: User) => Promise<User>;
};

export type TCreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
