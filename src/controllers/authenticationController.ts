import * as authenticationService from '../services/authenticationService';

async function authUser(
    email: string,
    name: string,
    phone: string,
    googleId: string | null,
    facebookId: string | null,
    accessToken: string,
    refreshToken: string,
) {
    console.log({ refreshToken, accessToken });

    await authenticationService.authUser(
        email,
        name,
        phone,
        googleId,
        facebookId,
        accessToken,
    );
}

export {
    authUser,
};
