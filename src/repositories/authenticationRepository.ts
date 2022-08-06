import { prisma } from '../config/database';
import { UserSignUpData } from '../interfaces/User';

async function create({ name, email, phone, googleId }: UserSignUpData) {
    const user = await prisma.user.create({
        data: {
            name,
            email,
            phone,
        },
    });

    return user;
}
export {
    create,
};
