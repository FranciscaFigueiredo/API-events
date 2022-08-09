import { prisma } from '../config/database';
import { UserSignUpData } from '../interfaces/User';

async function upsert(objectUpsertUserData: UserSignUpData) {
    const {
        email,
        name,
        phone,
        facebookId,
        googleId,
    } = objectUpsertUserData;

    console.log({ objectUpsertUserData });

    const user = await prisma.user.upsert({
        where: {
            email,
        },
        update: {
            name,
            phone,
            facebookId,
            googleId,
        },
        create: {
            ...objectUpsertUserData,
        },
    });

    return user;
}

async function findRegisteredEmail(email: string) {
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    });

    return user;
}

export {
    upsert,
    findRegisteredEmail,
};
