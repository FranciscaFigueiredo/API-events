import ForbiddenError from '../errors/ForbiddenError';
import * as subscriptionRepository from '../repositories/subscriptionRepository';
import { searchEventById } from './eventService';

async function createSubscription(userId: number, eventId: number) {
    await searchEventById(eventId);

    const subscriptionAlreadyMade = await subscriptionRepository
        .findSubscriptionAlreadyMade(userId, eventId);

    if (subscriptionAlreadyMade) {
        throw new ForbiddenError('Subscription already made');
    }

    const events = await subscriptionRepository.create(userId, eventId);

    return events;
}

async function findUserSubscriptions(userId: number) {
    const subscriptions = await subscriptionRepository.findUserSubscriptions(userId);

    return subscriptions;
}

export {
    createSubscription,
    findUserSubscriptions,
};
