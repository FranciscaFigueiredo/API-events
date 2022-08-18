import { prisma } from '../config/database';
import { UserSignUpData } from '../interfaces/User';

async function upsert(userDataUpsertObject: UserSignUpData) {
    const {
        email,
        name,
        phone,
        facebookId,
        facebookToken,
        googleId,
        googleToken,
    } = userDataUpsertObject;

    const user = await prisma.user.upsert({
        where: {
            email,
        },
        update: {
            name,
            phone,
            facebookId,
            facebookToken,
            googleId,
            googleToken,
        },
        create: {
            ...userDataUpsertObject,
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
