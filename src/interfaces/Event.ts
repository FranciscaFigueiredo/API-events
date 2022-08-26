import { Event } from '@prisma/client';

export type EventInsertData = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;

export type EventUpdateData = Partial<EventInsertData>;
