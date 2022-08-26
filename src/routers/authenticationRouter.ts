import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'phone', 'profile'] }));

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get('/auth/facebook', passport.authenticate('facebook', {
//     scope: ['email', 'user_location'],
// }));

router.get(
    '/auth/redirect/google',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.sendStatus(201);
    },
);

router.get(
    '/auth/redirect/facebook',
    passport.authenticate('facebook', { failureRedirect: '/login', failureMessage: true }),
    (req, res) => {
        res.sendStatus(201);
    },
);

export default router;
