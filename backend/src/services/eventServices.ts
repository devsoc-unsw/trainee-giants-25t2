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
        recommendedPlaces: [userPlace],
        shareId: randomUUID()
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

export async function generateUrl(eid: string) {
    const events= eventCollection();
    const found = await events.findOne({ eventId: eid });
    if (!found) {
        throw new Error("Event not found");
    }

    const sid = found.shareId;
    // Add BASE_URL once deployed
    const baseUrl = process.env.BASE_URL || "http://localhost:3000"; 
    const shareUrl = `${baseUrl}/api/event/share/${sid}`;

    return shareUrl
}