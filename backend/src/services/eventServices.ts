import { Event, EventList, UserPlace } from "../types";
import { randomUUID } from "crypto";
import { getDatabase } from "../db";

function eventCollection() {
    return getDatabase().collection<Event>("events");
}

export async function ensureEventsIndex() {
    await eventCollection().createIndex({ eventId: 1 }, { unique: true });
    // await eventCollection().createIndex({ userId: 1 }, {unique: true});  // multiple events for the same user?
    await eventCollection().createIndex({ userId: 1 }, { unique: false });
}

export async function findEventByEventId(eid: string) {
    const event = eventCollection();
    return event.findOne({ eventId: eid });
}

export async function findEventByHostId(id: string) {
    const event = eventCollection();
    return event.findOne({ userId: id });
}

export async function createEvent(name: string, dates: Date[], startTime: string, endTime: string, userPlace: UserPlace) {
    const events = eventCollection();

    const event: Event = {
        eventId: randomUUID(),
        userId: userPlace.userId,
        eventName: name,
        eventTimeSpan: {
            dates,
            dayStart: startTime,
            dayEnd: endTime,
        },
        availability: [
            {
                users: [],
                times: [],
            }
        ],
        recommendedPlaces: userPlace.likes
    }

    await events.insertOne(event);

    return event;
}

export async function listEvent(uid: string) {
    const events = eventCollection();
    const found = await events.find({ userId: uid }).toArray();
    const eventNames: EventList[] = found.map(event => ({ eventId: event.eventId, eventName: event.eventName }));
    return eventNames;
}