import { AvailabilityBlock, Event, EventList, SlotInfo, User, UserPlace } from "../types";
import { randomUUID } from "crypto";
import { getDatabase } from "../db";
import e from "express";

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

export async function createEvent(name: string, dates: Date[], startTime: number, endTime: number, owner: User) {
    const events = eventCollection();

    const event: Event = {
        eventId: randomUUID(),
        userId: owner.userId,
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

export async function editEvent(eid: string, uid: string, newDates: Date[], newName: string, newStartdate: number, newEndate: number) {
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
    const events = eventCollection();
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

export async function deleteEvent(eid: string, uid: string) {
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
    newUser: User,
    slots: { date: string; times: string[] }[],
) {
    const events = eventCollection();
    const found = await events.findOne({ eventId: eid });
    if (!found) {
        throw new Error("Event not found");
    }

    const existingUser = found.availability.find(a => a.users === newUser.userId);

    if (existingUser) {
        // update the slots for this user
        await events.updateOne(
            { eventId: eid, "availability.users": newUser.userId },
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
                        users: newUser.userId,
                        name: newUser.name,
                        slots
                    }
                }
            }
        );
    }

    return found.availability;

}

export async function getAvailabilites(eid: string) {
    const events = eventCollection();
    const found = await events.findOne({ eventId: eid });

    if (!found) {
        throw new Error("Event not found");
    }

    return found.availability;
}

export async function getResults(eid: string) {
    const events = eventCollection();
    const event = await events.findOne({ eventId: eid });
    if (!event) {
        throw new Error("Event not found");
    }

    const availability: AvailabilityBlock[] = event.availability ?? [];
    const recommendedPlaces: UserPlace[] = event.recommendedPlaces ?? [];

    // getting the names
    const userIds = new Set<string>();
    availability.forEach(a => a.users && userIds.add(a.users));
    recommendedPlaces.forEach(r => r.userId && userIds.add(r.userId));

    const userNames = new Set<string>();
    if (userIds.size) {
        const users = getDatabase().collection<User>("users");

        for (const uid of userIds) {
            const user = await users.findOne({ userId: uid });
            if (user) userNames.add(user.name);
        }

        for (const avail of availability) {
            userNames.add(avail.name);
        }
    }

    // const getName = async (uid: string) => {
    //     const users = await getDatabase().collection<User>("users");
    //     const user = await users.findOne({ userId: uid });
    //     if (user) {
    //         return user.name;
    //     } else {
    //         return "SDF"
    //     }
    // }

    // getting the best restaraunt
    const restrauntScores = new Map<string, number>();

    for (const r of recommendedPlaces) {
        r.likes.forEach(name => {
            const currScore = restrauntScores.get(name) || 0;
            restrauntScores.set(name, currScore + 1);
        });
        r.dislikes.forEach(name => {
            const currScore = restrauntScores.get(name) || 0;
            restrauntScores.set(name, currScore - 1);
        });
    }

    let highestScore = -Infinity;
    let topRestaraunt = "";

    for (const [name, score] of restrauntScores.entries()) {
        if (score > highestScore) {
            highestScore = score;
            topRestaraunt = name;
        }
    }


    // avaliability slots
    const slotKey = (date: string, time: string) => `${date}T${time}`;
    const slotMap = new Map<string, SlotInfo>();

    for (const avail of availability) {
        // const name = await getName(avail.users);
        const name = avail.name;

        for (const slot of avail.slots) {
            const date = slot.date;
            for (const t of slot.times) {
                const key = slotKey(date, t);
                const curr = slotMap.get(key) ?? { date: date, time: t, count: 0, users: [] };
                curr.count += 1;
                curr.users.push(name);
                slotMap.set(key, curr);
            }
        }
    }

    const timeSlots = Array.from(slotMap.values()).sort((a, b) => {
        if (a.date !== b.date) return a.date < b.date ? -1 : 1;
        if (a.time !== b.time) return a.time < b.time ? -1 : 1;
        return b.count - a.count;
    });


    return {
        event: {
            eventId: eid,
            eventName: event.eventName,
            eventTimeSpan: event.eventTimeSpan
        },
        names: Array.from(userNames),
        topRestaraunt: topRestaraunt,
        timeSlots: timeSlots
    };
}
