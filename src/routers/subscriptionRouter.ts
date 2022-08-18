import { Router } from 'express';
import * as subscriptionController from '../controllers/subscriptionController';
import { auth } from '../middlewares/authenticationMiddleware';

const router = Router();

router.post('/events/:id/subscription', auth, subscriptionController.postEventSubscription);

export default router;
