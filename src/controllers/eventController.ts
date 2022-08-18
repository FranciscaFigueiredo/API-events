import { Request, Response } from 'express';

import * as eventService from '../services/eventService';

async function getEventsList(req: Request, res: Response) {
    const { time } = req.query as { time: string };

    const events = await eventService.findEvents(time);

    return res.status(200).send(events);
}

async function getEventDescription(req: Request, res: Response) {
    const { id } = req.params;

    const description = await eventService.findEventDescription(Number(id));

    return res.status(200).send(description);
}

async function postEventData(req: Request, res: Response) {
    const { userId } = res.locals.user;

    const {
        name,
        startDate,
        endDate,
        startTime,
        endTime,
        coverPhoto,
        description,
        link,
    } = req.body;

    const eventCreated = await eventService.insertEventData({
        name,
        startDate,
        endDate,
        startTime,
        endTime,
        coverPhoto,
        description,
        link,
    }, Number(userId));

    return res.status(201).send(eventCreated);
}

async function patchEventData(req: Request, res: Response) {
    const { userId } = res.locals.user;
    const { id } = req.params;

    const eventCreated = await eventService.updateEventData(
        req.body,
        Number(userId),
        Number(id),
    );

    return res.status(200).send(eventCreated);
}

export {
    getEventsList,
    getEventDescription,
    postEventData,
    patchEventData,
};
