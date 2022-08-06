import { Router } from 'express';
import passport from 'passport';
// import { passport } from '../config/passport';
// import * as authenticationController from '../controllers/authenticationController';

const router = Router();

// router.post('/auth/google', authenticationController.postSignUp);

router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope:
        ['email', 'profile'],
    }),
);

router.get('/auth/google/callback', passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

export default router;
