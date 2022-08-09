import { User } from '@prisma/client';

function googleAlreadyRegistered(userData: User, googleId: string) {
    if (googleId && userData.googleId) {
        return true;
    }

    return false;
}

function facebookAlreadyRegistered(userData: User, facebookId: string) {
    if (facebookId && userData.facebookId) {
        return true;
    }

    return false;
}

export {
    googleAlreadyRegistered,
    facebookAlreadyRegistered,
};
