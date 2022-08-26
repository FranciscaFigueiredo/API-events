import { Router } from 'express';
import * as subscriptionController from '../controllers/subscriptionController';
import { auth } from '../middlewares/authenticationMiddleware';

const router = Router();

router.post('/events/:id/subscription', auth, subscriptionController.postEventSubscription);
router.get('/subscriptions', auth, subscriptionController.getUserSubscriptions);

export default router;
