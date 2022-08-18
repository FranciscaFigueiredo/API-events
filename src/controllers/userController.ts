import { Request, Response } from 'express';

import * as userService from '../services/userService';

async function getUserEvent(req: Request, res: Response) {
    const { userId } = res.locals.user;

    const events = await userService.findUserEvents(userId);

    return res.status(200).send(events);
}

export {
    getUserEvent,
};
