import { Event, EventList, UserPlace } from "../types";
import { randomUUID } from "crypto";
import { getDatabase } from "../db";

function eventCollection() {
    return getDatabase().collection<Event>("events");
}

export async function ensureEventsIndex() {
    await eventCollection().createIndex({ eventId: 1 }, { unique: true });
    // await eventCollection().createIndex({ userId: 1 }, {unique: true});  // multiple events for the same user?
    await eventCollection().createIndex({ userId: 1 });
}

export async function findEventByEventId(eid: string) {
    const event = eventCollection();
    return event.findOne({ eventId: eid });
}

// export async function findEventByHostId(id: string) {
//     const event = eventCollection();
//     return event.findOne({ userId: id });
// }

export async function createEvent(name: string, dates: Date[], startTime: number, endTime: number, owner: string) {
    const events = eventCollection();

    const event: Event = {
        eventId: randomUUID(),
        userId: owner,
        eventName: name,
        eventTimeSpan: {
            dates,
            dayStart: startTime,
            dayEnd: endTime,
        },
        availability: [],
        recommendedPlaces: [],
        shareId: randomUUID()
    }

    await events.insertOne(event);
    return event;
}

export async function editEvent(eid: string, uid:string, newDates: Date[], newName: string, newStartdate: number, newEndate: number) {
    const events = eventCollection();
    const found = await events.findOne({ eventId: eid });

    if (!found) {
        throw new Error("Event not found");
    }
    if (found.userId != uid) {
        throw new Error("Event not host");
    }

    const result = await events.findOneAndUpdate(
        { eventId: eid },
        {
            $set: {
                eventName: newName,
                eventTimeSpan: {
                    dates: newDates,
                    dayStart: newStartdate,
                    dayEnd: newEndate,
                },
            },
        },
        { returnDocument: "after" } 
    );

    return result; 
}

export async function editFoodPlaces(eid: string, user: UserPlace) {
    const events = eventCollection();
    const found = await events.findOne({ eventId: eid });

    if (!found) {
        throw new Error("Event not found");
    }

    const result = await events.findOneAndUpdate(
        { 
            eventId: eid,
        },
        {
            $push: {
                recommendedPlaces: user
            }
        },
        { returnDocument: "after" } 
    );

    return result; 
}

export async function listEvent(uid: string) {
    const events = eventCollection();
    const found = await events.find({ userId: uid }).toArray();
    const eventNames: EventList[] = found.map(event => ({ eventId: event.eventId, eventName: event.eventName }));
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

export async function deleteEvent(eid: string, uid:string) {
    const events = eventCollection();
    const found = await events.findOne({ eventId: eid });

    if (!found) {
        throw new Error("Event not found");
    }
    if (found.userId != uid) {
        throw new Error("Event not host");
    }

    const result = await events.findOneAndDelete({ eventId: eid });
    if (result) {
        return "Event deleted successfully";
    }
    return "No event deleted";
}

export async function addUserAvailability(
    eid: string,
    uid: string,
    slots: { date: string; times: string[] }[]
) {
    const events = eventCollection();
    const found = await events.findOne({ eventId: eid });
    if (!found) {
        throw new Error("Event not found");
    }

    const existingUser = found.availability.find(a => a.users.includes(uid));

    if (existingUser) {
        // update the slots for this user
        await events.updateOne(
            { eventId: eid, "availability.users": uid },
            {
                $set: {
                    "availability.$.slots": slots
                }
            }
        );
    } else {
        // push new user availability entry
        await events.updateOne(
            { eventId: eid },
            {
                $push: {
                    availability: {
                        users: [uid],
                        slots
                    }
                }
            }
        );
    }

    return await events.findOne({ eventId: eid });
}
