import { Router } from 'express';
import eventRouter from './eventRouter';
import authenticationRouter from './authenticationRouter';

const router = Router();

router.use(eventRouter);
router.use(authenticationRouter);

export default router;
