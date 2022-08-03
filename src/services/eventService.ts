import * as eventRepository from '../repositories/eventRepository';

async function findEvents() {
    const events = await eventRepository.findEvents();

    return events;
}

export {
    findEvents,
};
