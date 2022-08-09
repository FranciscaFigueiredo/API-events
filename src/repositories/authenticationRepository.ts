import { prisma } from '../config/database';
import { UserSignUpData } from '../interfaces/User';

async function upsert(objectUpsertUserData: UserSignUpData) {
    const {
        email,
        name,
        phone,
    } = objectUpsertUserData;

    const user = await prisma.user.upsert({
        where: {
            email,
        },
        update: {
            name,
            phone,
        },
        create: {
            ...objectUpsertUserData,
        },
    });

    return user;
}
export {
    upsert,
};
