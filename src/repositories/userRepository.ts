import { prisma } from '../config/database';

async function findUserEvents(userId: number) {
    const events = await prisma.user.findFirst({
        select: {
            id: true,
            name: true,
            email: true,
            Event: true,
        },
        where: { id: userId },
    });

    return events;
}

async function findUserEventByEventId(userId: number, eventId: number) {
    const events = await prisma.user.findFirst({
        where: { id: userId },
        select: {
            Event: {
                where: { id: eventId },
            },
        },
    });

    return events;
}

export {
    findUserEvents,
    findUserEventByEventId,
};
