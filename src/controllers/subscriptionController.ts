import { Request, Response } from 'express';

import * as subscriptionService from '../services/subscriptionService';

async function postEventSubscription(req: Request, res: Response) {
    const { userId } = res.locals.user;
    const { id } = req.params;

    const events = await subscriptionService.createSubscription(Number(userId), Number(id));

    return res.status(200).send(events);
}

async function getUserSubscriptions(req: Request, res: Response) {
    const { userId } = res.locals.user;

    const subscriptions = await subscriptionService.findUserSubscriptions(Number(userId));

    return res.status(200).send(subscriptions);
}

export {
    postEventSubscription,
    getUserSubscriptions,
};
