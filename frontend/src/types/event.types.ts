import type { UserPlace } from "./user.types";

export interface Event {
    eventId: string;
    userId: string;
    eventName: string;
    eventTimeSpan: {
        dates: Date[];
        dayStart: string;
        dayEnd: string;
    }
    availability: {
        users: string[];
        slots: {
            date: string;
            times: string[];
        }[];
    }[];
    recommendedPlaces: UserPlace[];
    shareId: string;
}


export interface TimeSlot {
    date: string,
    time: string,
    count: number,
    users: string[]
}

export interface Results {
    event: {
        eventId: string,
        eventName: string,
        eventTimeSpan: {
            dates: Date[];
            dayStart: string;
            dayEnd: string;
        }
    },
    names: string[],
    topRestaraunt: string,
    timeSlots: TimeSlot[]
}