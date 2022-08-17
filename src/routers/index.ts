import { Router } from 'express';
import eventRouter from './eventRouter';
import authenticationRouter from './authenticationRouter';
import imageFileRouter from './imageFileRouter';

const router = Router();

router.use(eventRouter);
router.use(authenticationRouter);
router.use(imageFileRouter);

export default router;
