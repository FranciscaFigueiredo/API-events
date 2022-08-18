import * as userRepository from '../repositories/userRepository';

async function findUserEvents(userId: number) {
    const events = await userRepository.findUserEvents(userId);

    return events;
}

async function findUserEventByEventId(userId: number, eventId: number) {
    const events = await userRepository.findUserEventByEventId(userId, eventId);

    return events;
}

export {
    findUserEvents,
    findUserEventByEventId,
};
