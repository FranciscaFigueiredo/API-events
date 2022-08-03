import { prisma } from '../config/database';

async function findEvents() {
    const events = await prisma.event.findMany();

    return events;
}

export {
    findEvents,
};
