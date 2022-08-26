import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import BodyError from '../errors/BodyError';

// eslint-disable-next-line no-unused-vars
type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;

function validate(schema: ObjectSchema, type: 'body' | 'params'): ValidationMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[type], {
            abortEarly: false,
        });

        if (!error) {
            next();
        } else {
            throw new BodyError(error.message);
        }
    };
}

export function validateBody(schema: ObjectSchema): ValidationMiddleware {
    return validate(schema, 'body');
}
