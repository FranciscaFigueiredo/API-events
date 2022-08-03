import { Router } from 'express';
import eventRouter from './eventRouter';

const router = Router();

router.use(eventRouter);

export default router;
