import * as authenticationRepository from '../repositories/authenticationRepository';

async function authUser(
    email: string,
    name: string,
    phone: string,
    googleId: string | null,
    facebookId: string | null,
    accessToken: string,
) {
    const searchEmailRegistered = await authenticationRepository.findRegisteredEmail(email);

    await authenticationRepository.upsert({
        email,
        name,
        phone,
        googleId: googleId || searchEmailRegistered.googleId,
        googleToken: googleId ? accessToken : null,
        facebookId: facebookId || searchEmailRegistered.facebookId,
        facebookToken: facebookId ? accessToken : null,
    });
}

export {
    authUser,
};
