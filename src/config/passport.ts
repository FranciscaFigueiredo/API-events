import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { authUser } from '../controllers/authenticationController';

export default new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.URL_CALLBACK,
    },
    (async (accessToken, refreshToken, profile, cb) => {
        // User.findOrCreate({ exampleId: profile.id }, (err, user) => cb(err, user));
        await authUser(
            profile.email,
            profile.displayName,
            '99999999999',
            profile.provider === 'google' ? profile.id : null,
            null,
            accessToken,
            refreshToken,
        );
        console.log({ profile, cb });
    }),
);
