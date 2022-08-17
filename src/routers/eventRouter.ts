import { Router } from 'express';
import passport from 'passport';
import * as eventController from '../controllers/eventController';
import { validateBody } from '../middlewares/validationMiddleware';
import { createEventSchema } from '../schemas/eventSchema';

const router = Router();

router.get('/events', eventController.getEventsList);
router.get('/events/:id', eventController.getEventDescription);
router.post(
    '/events',
    passport.authenticate('facebook' || 'google', { failureRedirect: '/login' }),
    validateBody(createEventSchema),
    eventController.postEventData,
);

export default router;
