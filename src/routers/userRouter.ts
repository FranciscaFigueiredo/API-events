import { Router } from 'express';
import * as userController from '../controllers/userController';
import { auth } from '../middlewares/authenticationMiddleware';

const router = Router();

router.get('/users/events', auth, userController.getUserEvent);

export default router;
