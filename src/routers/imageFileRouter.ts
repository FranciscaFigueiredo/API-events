import { Router } from 'express';
import * as imageFileController from '../controllers/imageFileController';
import { validateBody } from '../middlewares/validationMiddleware';
import { createImageFileSchema } from '../schemas/imageFileSchema';

const router = Router();

router.post('/upload', validateBody(createImageFileSchema), imageFileController.uploadFile);

export default router;
