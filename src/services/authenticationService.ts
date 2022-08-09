import * as authenticationRepository from '../repositories/authenticationRepository';

async function authUser(
    email: string,
    name: string,
    phone: string,
    googleId: string | null,
    facebookId: string | null,
) {
    await authenticationRepository.upsert({
        email,
        name,
        phone,
        googleId,
        facebookId,
    });
}

export {
    authUser,
};
