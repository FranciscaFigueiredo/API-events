import joi from 'joi';

export const createImageFileSchema = joi.object<{ file: string}>({
    file: joi.string().dataUri(),
});
