import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import serverMiddlewareError from './middlewares/serverMiddlewareError';
import router from './routers';
// import { passportjsconfig } from './config/passport';
// import OAuth2Strategy from 'passport-oauth2';
// eslint-disable-next-line import/no-unresolved
import { create } from './repositories/authenticationRepository';

const app = express();

app.use(cors());
app.use(express.json());

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.URL_CALLBACK,
        passReqToCallback: true,
        scope: ['name', 'emails'],
    },
    async (
        request: any,
        accessToken: any,
        refreshToken: any,
        profile: { id: any; },
        // eslint-disable-next-line no-unused-vars
        done: (arg0: any, arg1: any) => any,
    ) => {
        await create({
            name: 'aa', email: 'aaaaa', phone: '54545', googleId: profile.id,
        });
    },
));
app.use(router);

app.use(serverMiddlewareError);

export {
    app,
};
