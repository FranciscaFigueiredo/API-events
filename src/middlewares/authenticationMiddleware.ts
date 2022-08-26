import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/database';
import UnauthorizedError from '../errors/UnauthorizedError';

async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        throw new UnauthorizedError('');
    }

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    googleToken: token,
                },
                {
                    facebookToken: token,
                },
            ],
        },
    });

    res.locals.user = { userId: user.id };

    return next();
}

export {
    auth,
};
