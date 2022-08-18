import { Strategy as Google } from 'passport-google-oauth2';
import { Strategy as Facebook } from 'passport-facebook';
import * as authenticationController from '../controllers/authenticationController';

export const GoogleStrategy = new Google(
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
            phone?: string;
            provider: string;
            id: string;
        },
        // eslint-disable-next-line no-unused-vars
        done: (arg0: void) => any,
    ) => {
        const user = await authenticationController.authUser(
            profile.email,
            profile.displayName,
            profile?.phone,
            profile.provider === 'google' ? profile.id : null,
            null,
            accessToken,
        );

        return user;
    }),
);

export const FacebookStrategy = new Facebook(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_URL_CALLBACK,
        enableProof: true,
        passReqToCallback: true,
        profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    (async (
        request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        cb: any,
    ) => {
        const user = await authenticationController.authUser(
            profile.emails[0].value,
            profile.displayName,
            profile?.phone,
            null,
            profile.provider === 'facebook' ? profile.id : null,
            accessToken,
        );
        // eslint-disable-next-line no-unused-expressions
        (err: any) => cb(err, user);
        return user;
    }),
);
