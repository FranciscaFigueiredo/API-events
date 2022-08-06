import { User } from '@prisma/client';

export type UserSignUpData = {
    name: string;
    email: string;
    phone: string;
    googleId: string;
}
//  Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
