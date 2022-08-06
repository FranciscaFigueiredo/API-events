import passport from 'passport';
// import OAuth2Strategy from 'passport-oauth2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { create } from '../repositories/authenticationRepository';

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.URL_CALLBACK,
        passReqToCallback: true,
        scope: ['name', 'emails'],
    },
    async () => {
        await create({ name: 'aa', email: 'aaaaa', phone: 'sndede' });
    },
));

export {
    passport,
};
// passport.use(new OAuth2Strategy({
//     authorizationURL: process.env.URL_AUTHORIZATION,
//     tokenURL: process.env.URL_TOKEN,
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.URL_CALLBACK,
// },
// function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ exampleId: profile.id }, (err, user) => cb(err, user);
// }
// ));
