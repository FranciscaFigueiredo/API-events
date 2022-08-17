import { cloudinary } from '../config/cloudinary';

async function uploadFile(imageFile: string) {
    const uploadedUrl = await cloudinary.uploader.upload(imageFile, {
        upload_preset: 'dev_setups',
    });

    return uploadedUrl;
}

export {
    uploadFile,
};
