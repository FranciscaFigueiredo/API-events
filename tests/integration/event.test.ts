import '../../src/config/setup';
import supertest from 'supertest';
import { app } from '../../src/app';
import * as eventFactory from '../factories/eventFactory';
import { cleanDb } from '../helpers';
import { prisma } from '../../src/config/database';

beforeAll(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('POST /events', () => {
    it('should respond with status 201 and create new event if there is not any', async () => {
        const eventData = await eventFactory.createValidEventBody();

        const createdEvent = await server.post('/events')
            .set('Authorization', `Bearer ${process.env.VALID_TOKEN}`)
            .send(eventData);

        const event = await prisma.event.findFirst({
            where: {
                name: eventData.name,
            },
        });

        expect(createdEvent).toBeDefined();
        expect(event).toEqual(
            expect.objectContaining({
                name: eventData.name,
                startDate: eventData.startDate,
                endDate: eventData.endDate,
                startTime: eventData.startTime,
                endTime: eventData.endTime,
                coverPhoto: eventData.coverPhoto,
                description: eventData.description,
                link: eventData.link,
            }),
        );
    });

    it('should respond with status 400 when invalid event data', async () => {
        const event = await eventFactory.insertEventData();

        const createdEvent = await server.post('/events').send({
            name: event.name,
            startDate: event.startDate,
            endDate: event.endDate,
            startTime: event.startTime,
            endTime: event.endTime,
            coverPhoto: event.coverPhoto,
            description: event.description,
        });

        expect(createdEvent.status).toBe(409);
    });

    it('should respond with status 409 when event data already exists', async () => {
        const event = await eventFactory.insertEventData();

        const createdEvent = await server.post('/events').send({
            name: event.name,
            startDate: event.startDate,
            endDate: event.endDate,
            startTime: event.startTime,
            endTime: event.endTime,
            coverPhoto: event.coverPhoto,
            description: event.description,
            link: event.link,
        });

        expect(createdEvent.status).toBe(409);
    });
});
