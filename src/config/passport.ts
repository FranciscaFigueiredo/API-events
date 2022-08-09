import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import Strategy from 'passport-facebook';
import * as authenticationController from '../controllers/authenticationController';

export default new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_URL_CALLBACK,
        passReqToCallback: true,
    },
    (async (
        request: any,
        accessToken: string,
        refreshToken: string,
        profile: {
            email: string;
            displayName: string;
            provider: string;
            id: string;
        },
        // eslint-disable-next-line no-unused-vars
        done: (arg0: void) => any,
    ) => {
        console.log(request.query);

        const user = await authenticationController.authUser(
            profile.email,
            profile.displayName,
            '99999999999',
            profile.provider === 'google' ? profile.id : null,
            null,
            accessToken,
            refreshToken,
        );
        console.log({ profile, user });
        return user;
    }),
);

export const FacebookStrategy = new Strategy.Strategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_URL_CALLBACK,
        enableProof: true,
        passReqToCallback: true,
        profileFields: ['id', 'displayName', 'photos', 'email'],
    },

    // (request, accessToken, refreshToken, profile, cb) => {
    //     // console.log(request);

    //     console.log(profile, (err: any, user: any) => cb(err, user));
    //     return true;
    // },
    (async (
        request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        cb: any,
    ) => {
        console.log(profile);

        const user = await authenticationController.authUser(
            profile.emails[0].value,
            profile.displayName,
            '99999999999',
            null,
            profile.provider === 'facebook' ? profile.id : null,
            accessToken,
            refreshToken,
        );
        console.log(profile, (err: any) => cb(err, user));
        return user;
    }),
);
