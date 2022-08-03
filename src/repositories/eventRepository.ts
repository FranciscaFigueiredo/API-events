import { prisma } from '../config/database';

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

export {
    findEvents,
    findEventDescription,
};
