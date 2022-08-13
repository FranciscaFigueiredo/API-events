import { User } from '@prisma/client';

export type UserSignUpData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
