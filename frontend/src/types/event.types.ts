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