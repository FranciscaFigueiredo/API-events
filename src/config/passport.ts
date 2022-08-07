import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

export default new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.URL_CALLBACK,
    },
    ((accessToken, refreshToken, profile, cb) => {
        // User.findOrCreate({ exampleId: profile.id }, (err, user) => cb(err, user));
        // await;
        console.log({ profile, cb });
    }),
);
