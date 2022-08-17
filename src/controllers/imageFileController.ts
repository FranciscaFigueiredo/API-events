import { Request, Response } from 'express';
import * as imageFileService from '../services/imageFileService';

async function uploadFile(req: Request, res: Response) {
    const { file } = req.body as { file: string};

    const uploadedUrl = await imageFileService.uploadFile(file);

    return res.status(201).send(uploadedUrl);
}

export {
    uploadFile,
};
