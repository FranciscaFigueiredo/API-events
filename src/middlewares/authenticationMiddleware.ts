import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

async function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    let userId = null;
    let socialAccountType = '';

    if (!token) {
        throw new UnauthorizedError('');
    }

    const key = process.env.JWT_SECRET;

    jwt.verify(token, key, (error: any, authentication: JwtPayload) => {
        if (error) {
            throw new UnauthorizedError('');
        }
        userId = authentication.userId;
        socialAccountType = authentication.socialAccountType;
    });

    res.locals.user = {
        userId,
        socialAccountType,
    };

    return next();
}

export {
    auth,
};
