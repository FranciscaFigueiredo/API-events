import { Event } from '@prisma/client';

import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError';

import { EventInsertData } from '../interfaces/Event';

import * as eventRepository from '../repositories/eventRepository';
import * as userRepository from '../repositories/userRepository';

import { cleaningBody, verifyDateTime } from '../utils/eventUtil';

async function findEvents(time: string): Promise<Event[]> {
    const events = await eventRepository.findEvents(time);

    return events;
}

async function findEventDescription(id: number): Promise<Event> {
    const description = await eventRepository.findEventDescription(id);

    if (!description) {
        throw new NotFoundError();
    }

    return description;
}

async function searchEventNameAlreadyExists(name: string, eventId: number) {
    const searchEvent = await eventRepository.findEventByName(name);

    if (searchEvent && eventId !== searchEvent.id) {
        throw new ConflictError('Event name already exists');
    }
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
    await searchEventNameAlreadyExists(name, null);

    await verifyDateTime(startDate, endDate, startTime, endTime);

    const { cleanedName, cleanedDescription } = await cleaningBody(name, description);

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

async function verifyAuthorization(userId: number, eventId: number) {
    const isAuthorized = await userRepository.findUserEventByEventId(userId, eventId);

    if (!isAuthorized) {
        throw new UnauthorizedError('');
    }
}

async function searchEventById(eventId: number) {
    const eventRegistered = await eventRepository.findEventById(eventId);

    if (!eventRegistered) {
        throw new NotFoundError('');
    }

    return eventRegistered;
}

async function updateEventData(updateObject: EventInsertData, userId: number, eventId: number) {
    await verifyAuthorization(userId, eventId);

    const eventRegistered = await searchEventById(eventId);

    await searchEventNameAlreadyExists(updateObject?.name, eventId);

    await verifyDateTime(
        updateObject.startDate || eventRegistered.startDate,
        updateObject.endDate || eventRegistered.endDate,
        updateObject.startTime || eventRegistered.startTime,
        updateObject.endTime || eventRegistered.endTime,
    );

    const { cleanedName, cleanedDescription } = await cleaningBody(
        updateObject?.name || eventRegistered.name,
        updateObject?.description || eventRegistered.description,
    );

    const event = await eventRepository.update({
        name: cleanedName,
        startDate: updateObject.startDate || eventRegistered.startDate,
        endDate: updateObject.endDate || eventRegistered.endDate,
        startTime: updateObject.startTime || eventRegistered.startTime,
        endTime: updateObject.endTime || eventRegistered.endTime,
        coverPhoto: updateObject.coverPhoto || eventRegistered.coverPhoto,
        description: cleanedDescription,
        link: updateObject.link || eventRegistered.link,
    }, eventId);

    return event;
}

async function deleteEventById(userId: number, eventId: number) {
    await verifyAuthorization(userId, eventId);

    await searchEventById(eventId);

    await eventRepository.deleteEvent(eventId);

    return true;
}

export {
    findEvents,
    findEventDescription,
    insertEventData,
    updateEventData,
    deleteEventById,
    searchEventById,
};
