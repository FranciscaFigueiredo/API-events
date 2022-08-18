import dayjs from 'dayjs';
import DOMPurify from 'isomorphic-dompurify';
import ForbiddenError from '../errors/ForbiddenError';

async function verifyInvalidDate(startDate: Date, endDate: Date) {
    const now = dayjs().format('YYYY-MM-DD');

    const start = dayjs(startDate).format('YYYY-MM-DD');

    const isInvalidStart = dayjs(now) > dayjs(start);

    if (isInvalidStart) {
        throw new ForbiddenError('The date has passed!');
    }

    const end = dayjs(endDate).format('YYYY-MM-DD');

    const isInvalidEnd = dayjs(now) > dayjs(end);

    if (isInvalidEnd) {
        throw new ForbiddenError('End date cannot be earlier than start date!');
    }
}

async function verifyInvalidTime(
    startDate: Date,
    endDate: Date,
    startTime: string,
    endTime: string,
) {
    const start = dayjs(startDate).format('YYYY-MM-DD');
    const end = dayjs(endDate).format('YYYY-MM-DD');

    const isInvalidTime = dayjs(`${end} ${endTime}`) < dayjs(`${start} ${startTime}`);

    if (isInvalidTime) {
        throw new ForbiddenError('End hour cannot be earlier than start hour!');
    }
}

async function verifyDateTime(
    startDate: Date,
    endDate: Date,
    startTime: string,
    endTime: string,
) {
    await verifyInvalidDate(startDate, endDate);
    await verifyInvalidTime(startDate, endDate, startTime, endTime);
}

async function cleaningBody(
    name: string,
    description: string,
) {
    const cleanedName = DOMPurify.sanitize(name);
    const cleanedDescription = DOMPurify.sanitize(description);

    return {
        cleanedName,
        cleanedDescription,
    };
}

export {
    verifyDateTime,
    cleaningBody,
};
