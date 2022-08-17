import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import session from 'express-session';
import passport from 'passport';
import { FacebookStrategy, GoogleStrategy } from './config/passport';

import serverMiddlewareError from './middlewares/serverMiddlewareError';
import router from './routers';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));

app.use(passport.authenticate('session'));

passport.use(GoogleStrategy);
passport.use(FacebookStrategy);

app.use(router);

app.use(serverMiddlewareError);

export {
    app,
};
