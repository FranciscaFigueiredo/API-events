import joi from 'joi';
import { EventInsertData } from '../interfaces/Event';

export const createEventSchema = joi.object<EventInsertData>({
    name: joi.string().min(3).max(30).required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
    startTime: joi.string()
        .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
        .required(),
    endTime: joi.string()
        .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
        .required(),
    coverPhoto: joi.string()
        .pattern(/https?:\/\/res.cloudinary.com.*.(?:png|jpg)/)
        .required(),
    description: joi.string().required(),
    link: joi.string().uri(),
});
