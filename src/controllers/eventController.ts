import { Request, Response } from 'express';

import * as eventService from '../services/eventService';

async function getEventsList(req: Request, res: Response) {
    const events = await eventService.findEvents();

    return res.status(200).send(events);
}

export {
    getEventsList,
};
