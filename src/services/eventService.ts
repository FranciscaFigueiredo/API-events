import NotFoundError from '../errors/NotFoundError';
import * as eventRepository from '../repositories/eventRepository';

async function findEvents() {
    const events = await eventRepository.findEvents();

    return events;
}

async function findEventDescription(id: number) {
    const description = await eventRepository.findEventDescription(id);

    if (!description) {
        throw new NotFoundError();
    }

    return description;
}

export {
    findEvents,
    findEventDescription,
};
