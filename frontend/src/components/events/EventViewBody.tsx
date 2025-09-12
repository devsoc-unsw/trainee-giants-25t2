import type { Event } from "../../types/event.types";
import { EventTimetable } from "../events/EventTimetable";

export function EventTimetableBody({ event }: { event: Event }) {
  // TO DO: link with event creation info, this is sample data
  // const today = new Date();
  // const dates = Array.from({ length: 8 }, (_, i) => {
  //   const d = new Date(today);
  //   d.setDate(today.getDate() + i);
  //   return d;
  // });
  return (
    <div className="flex bg-white h-screen justify-center items-center flex-col">
      <div className="max-w-4xl">
        <EventTimetable
          eid={event.eventId}
          dates={event.eventTimeSpan.dates}
          startHour={parseInt(event.eventTimeSpan.dayStart)}
          endHour={parseInt(event.eventTimeSpan.dayEnd)}
        />
      </div>
    </div>
  );
}