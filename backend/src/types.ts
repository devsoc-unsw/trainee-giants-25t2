import { ObjectId } from 'mongodb';

export interface User {
     _id: ObjectId;
    userId: string;
    googleId: string;
    email: string;
    password: string;
    name: string;

    foodRecommendation: string[]; // list of foods from tinder picks
    events: EventList[]; // list of createdevents
    eventHistory: EventList[];   // list of past events
}

export interface UserList {
    userId: string;
    name: string;
}

export interface UserToken {
    name: string;
    email: string;
}

export interface Event {
    eventId: string;
    eventName: string;
    eventTimeSpan: {
        start: string;
        end: string;
    }
    availability: [
        {
            users: UserList[];
            times: string[];
        }
    ]
    // Show based on the availability on the fe ui
    recommendedPlaces: [
        {
            availabilityId: string; 
            foodPlaceId: string;
            votes: string;
        }
    ]
}

export interface EventList {
    eventId: string;
    eventName: string;
}


// FOR MAP IMPLEMENTATION IF WE HAVE TIME
export interface FoodSpot {
    latitude: number;
    longitude: number;
}