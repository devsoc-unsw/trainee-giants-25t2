import { ObjectId } from 'mongodb';

export interface User {
    _id: ObjectId;
    userId: string;
    googleId: string;
    email: string;
    password: string;
    name: string;

    // foodRecommendation: string[]; // list of foods from tinder picks
    likes: string[];
    dislikes: string[];
    events: EventList[]; // list of createdevents
    eventHistory: EventList[];   // list of past events
}

// export interface Participant {
//   participantId: string;   
//   name: string;
//   email?: string;          
//   availability: string[];  
// }

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
    userId: string; // owner
    eventName: string;
    eventTimeSpan: {
        // start: string;
        // end: string;
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
    // Show based on the availability on the fe ui
    recommendedPlaces: UserPlace[];
    shareId: string;
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

export interface Place {
    _id?: ObjectId;
    name: string;
    rating: number | string;
    address: string;
    photoUrl?: string;
    website?: string;
    phone?: string;
    priceLevel?: number | string;
    placeId: string;
    googleMapsUrl: string;
    dist?: number;

    location?: {
        type: "Point";
        coordinates: [number, number]; // lat, lon
    };
}

export interface UserPlace {
    userId: string,
    likes: string[], // liked resto
    dislikes: string[], // disliked resto
}

// export interface UserPlaceByParticipant {
//     participantId: string;
//     userId?: never;
//     likes: string[];
//     dislike: string[];
// }
