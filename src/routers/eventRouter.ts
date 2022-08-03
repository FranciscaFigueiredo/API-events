import { Router } from 'express';
import * as eventController from '../controllers/eventController';

const router = Router();

router.get('/events', eventController.getEventsList);

export default router;
