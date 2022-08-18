import { Router } from 'express';
// import passport from 'passport';
import * as eventController from '../controllers/eventController';
import { auth } from '../middlewares/authenticationMiddleware';
import { validateBody } from '../middlewares/validationMiddleware';
import { createEventSchema, updateEventSchema } from '../schemas/eventSchema';

const router = Router();

router.get('/events', eventController.getEventsList);

router.get('/events/:id', eventController.getEventDescription);

router.post(
    '/events',
    // passport.authenticate('facebook' || 'google', { failureRedirect: '/login' }),
    auth,
    validateBody(createEventSchema),
    eventController.postEventData,
);

router.patch(
    '/events/:id/edit',
    auth,
    validateBody(updateEventSchema),
    eventController.patchEventData,
);

export default router;
