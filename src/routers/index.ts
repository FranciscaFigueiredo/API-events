import { Router } from 'express';
import eventRouter from './eventRouter';
import authenticationRouter from './authenticationRouter';
import imageFileRouter from './imageFileRouter';
import userRouter from './userRouter';
import subscriptionRouter from './subscriptionRouter';

const router = Router();

router.use(eventRouter);
router.use(authenticationRouter);
router.use(imageFileRouter);
router.use(userRouter);
router.use(subscriptionRouter);

export default router;
