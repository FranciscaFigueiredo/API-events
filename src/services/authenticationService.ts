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
    console.log({
        email,
        name,
        phone,
        googleId,
        facebookId,
    });
    // }

    // const isGoogleRegistered = googleAlreadyRegistered(searchEmailRegistered, googleId);

    // if (isGoogleRegistered && googleId) {
    //     return searchEmailRegistered;
    // }

    // const isFacebookRegistered = facebookAlreadyRegistered(searchEmailRegistered, facebookId);

    // if (isFacebookRegistered && facebookId) {
    //     return
    // }
}

export {
    authUser,
};
