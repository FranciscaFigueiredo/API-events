import { Event } from '@prisma/client';

export type EventInsertData = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;
