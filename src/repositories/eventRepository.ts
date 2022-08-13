import { Event } from '@prisma/client';
import { prisma } from '../config/database';
import { EventInsertData } from '../interfaces/Event';

async function findEvents() {
    const events = await prisma.event.findMany();

    return events;
}

async function findEventDescription(id: number) {
    const description = await prisma.event.findFirst({
        where: { id },
    });

    return description;
}

async function findEventByName(name: string) {
    const event = await prisma.event.findFirst({
        where: { name },
    });

    return event;
}

async function create(eventDataInsertObject: EventInsertData): Promise<Event> {
    const eventCreated = await prisma.event.create({
        data: eventDataInsertObject,
    });

    return eventCreated;
}

export {
    findEvents,
    findEventDescription,
    findEventByName,
    create,
};
