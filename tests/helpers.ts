import { prisma } from '../src/config/database';

export async function cleanDb() {
    await prisma.event.deleteMany({});
    await prisma.user.deleteMany({});
}
