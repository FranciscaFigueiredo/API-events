import { Router } from 'express';
import * as eventController from '../controllers/eventController';

const router = Router();

router.get('/events', eventController.getEventsList);
router.get('/events/:id', eventController.getEventDescription);
router.post('/events', eventController.postEventData);

export default router;
