import * as authenticationRepository from '../repositories/authenticationRepository';

async function authUser(
    email: string,
    name: string,
    phone: string,
    googleId: string | null,
    facebookId: string | null,
) {
    const searchEmailRegistered = await authenticationRepository.findRegisteredEmail(email);

    await authenticationRepository.upsert({
        email,
        name,
        phone,
        googleId: googleId || searchEmailRegistered.googleId,
        facebookId: facebookId || searchEmailRegistered.facebookId,
    });
}

export {
    authUser,
};
