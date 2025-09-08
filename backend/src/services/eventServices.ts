import { Event, EventList, UserPlace } from "../types";
import { randomUUID } from "crypto";
import { getDatabase } from "../db";
import r from "../routes/authRoutes";

function eventCollection() {
    return getDatabase().collection<Event>("events");
}

export async function ensureEventsIndex() {
    await eventCollection().createIndex({ eventId: 1 }, { unique: true });
    await eventCollection().createIndex({ userId: 1 }, {unique: true});
}

export async function findEventByEventId(eid: string) {
    const event = eventCollection();
    return event.findOne({ eventId: eid });
}

export async function findEventByHostId(id: string) {
    const event = eventCollection();
    return event.findOne({ userId: id });
}

export async function createEvent(name: string, uid: string, startdate: string, enddate: string, userPlace: UserPlace) {
    const events = eventCollection();

    const event: Event = {
        eventId: randomUUID(),
        userId: uid,
        eventName: name,
        eventTimeSpan: {
            start: startdate,
            end: enddate,
        },
        availability: [
            {
                users: [],
                times: [],
            }
        ],
        recommendedPlaces: [userPlace]
    }

    await events.insertOne(event);

    return event;
}

export async function listEvent(uid: string) {
    const events = eventCollection();
    const found = await events.find({ userId: uid }).toArray();
    const eventNames = found.map(event => event.eventName);
    return eventNames;
}