import { Router } from 'express';
import * as imageFileController from '../controllers/imageFileController';

const router = Router();

router.post('/upload', imageFileController.uploadFile);

export default router;
