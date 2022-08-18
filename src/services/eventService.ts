import { Event } from '@prisma/client';
import DOMPurify from 'dompurify';
import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
import { EventInsertData } from '../interfaces/Event';
import * as eventRepository from '../repositories/eventRepository';

async function findEvents(): Promise<Event[]> {
    const events = await eventRepository.findEvents();

    return events;
}

async function findEventDescription(id: number): Promise<Event> {
    const description = await eventRepository.findEventDescription(id);

    if (!description) {
        throw new NotFoundError();
    }

    return description;
}

async function insertEventData({
    name,
    startDate,
    endDate,
    startTime,
    endTime,
    coverPhoto,
    description,
    link,
}: EventInsertData, userId: number) {
    const searchEvent = await eventRepository.findEventByName(name);

    if (searchEvent) {
        throw new ConflictError('Event name already exists');
    }

    const cleanedName = DOMPurify.sanitize(name);
    const cleanedDescription = DOMPurify.sanitize(description);

    const event = await eventRepository.create({
        name: cleanedName,
        startDate,
        endDate,
        startTime,
        endTime,
        coverPhoto,
        description: cleanedDescription,
        link,
    }, userId);

    return event;
}

export {
    findEvents,
    findEventDescription,
    insertEventData,
};
