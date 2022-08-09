import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'phone', 'profile'] }));
router.get(
    '/auth/example/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        // res.send('logado com sucesso');
        res.redirect('/');
    },
);

export default router;
