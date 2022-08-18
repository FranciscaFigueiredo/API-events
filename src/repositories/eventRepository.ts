import { Event } from '@prisma/client';
import { prisma } from '../config/database';
import { EventInsertData } from '../interfaces/Event';

async function findEvents(): Promise<Event[]> {
    const events = await prisma.event.findMany();

    return events;
}

async function findEventDescription(id: number): Promise<Event> {
    const description = await prisma.event.findFirst({
        where: { id },
    });

    return description;
}

async function findEventByName(name: string): Promise<Event> {
    const event = await prisma.event.findFirst({
        where: { name },
    });

    return event;
}

async function create(
    eventDataInsertObject: EventInsertData,
    userId: number,
) {
    const eventCreated = await prisma.event.create({
        data: {
            ...eventDataInsertObject,
            User: {
                connect: {
                    id: userId,
                },
            },
        },
        include: {
            User: true,
        },
    });

    return eventCreated;
}

export {
    findEvents,
    findEventDescription,
    findEventByName,
    create,
};
