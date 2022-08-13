import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { prisma } from '../../src/config/database';
import { EventInsertData } from '../../src/interfaces/Event';

async function createValidEventBody(): Promise<EventInsertData> {
    const start = dayjs(faker.date.future(10)).format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs(start).add(2, 'hour').format('YYYY-MM-DD HH:mm:ss');

    const body = {
        name: faker.lorem.sentence(),
        startDate: faker.date.soon(10),
        endDate: faker.date.soon(12),
        startTime: start.split(' ')[1],
        endTime: end.split(' ')[1],
        coverPhoto: faker.internet.avatar(),
        description: `
            # API - Events
    
            &nbsp;
            
            ## How to install and run on terminal
        `,
        link: faker.internet.url(),
    };

    return body;
}

async function insertEventData() {
    const eventData = await createValidEventBody();

    const createdEvent = await prisma.event.create({
        data: eventData,
    });

    return createdEvent;
}

export {
    createValidEventBody,
    insertEventData,
};
