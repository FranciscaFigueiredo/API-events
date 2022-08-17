import joi from 'joi';
import { EventInsertData } from '../interfaces/Event';

export const createEventSchema = joi.object<EventInsertData>({
    name: joi.string().min(3).max(30).required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
    startTime: joi.date().timestamp().required(),
    endTime: joi.number().required(),
    coverPhoto: joi.string()
        .pattern(/https?:\/\/.*.(?:png|jpg)/)
        .required(),
    description: joi.string().required(),
    link: joi.string().uri(),
});
