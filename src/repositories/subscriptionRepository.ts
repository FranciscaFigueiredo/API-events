import { prisma } from '../config/database';

async function create(userId: number, eventId: number) {
    const subscription = await prisma.subscription.create({
        data: {
            userId,
            eventId,
        },
    });

    return subscription;
}

async function findSubscriptionAlreadyMade(userId: number, eventId: number) {
    const subscription = await prisma.subscription.findFirst({
        where: {
            AND: [
                {
                    userId,
                },
                {
                    eventId,
                },
            ],
        },
    });

    return subscription;
}

async function findUserSubscriptions(userId: number) {
    const subscriptions = await prisma.subscription.findMany({
        where: {
            userId,
        },
        orderBy: [
            {
                Event: {
                    startDate: 'desc',
                },
            },
        ],
    });

    return subscriptions;
}

export {
    create,
    findSubscriptionAlreadyMade,
    findUserSubscriptions,
};
