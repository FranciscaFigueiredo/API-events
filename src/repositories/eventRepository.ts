import { Event } from '@prisma/client';
import { prisma } from '../config/database';
import { EventInsertData, EventUpdateData } from '../interfaces/Event';

async function findEvents(time: string): Promise<Event[]> {
    let events = time !== 'past' && time !== 'future'
        ? await prisma.event.findMany({}) : [];

    if (time === 'past') {
        events = await prisma.event.findMany({
            where: {
                endDate: {
                    lt: new Date(),
                },
            },
        });
    }

    if (time === 'future') {
        events = await prisma.event.findMany({
            where: {
                endDate: {
                    gt: new Date(),
                },
            },
        });
    }

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

async function findEventById(id: number): Promise<Event> {
    const event = await prisma.event.findFirst({
        where: { id },
    });

    return event;
}

async function create(
    eventDataInsertObject: EventInsertData,
    userId: number,
) {
    const createdEvent = await prisma.event.create({
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

    return createdEvent;
}

async function update(eventDataUpdateObject: EventUpdateData, id: number) {
    const updatedEvent = await prisma.event.update({
        where: { id },
        data: eventDataUpdateObject,
    });

    return updatedEvent;
}

export {
    findEvents,
    findEventDescription,
    findEventByName,
    findEventById,
    create,
    update,
};
