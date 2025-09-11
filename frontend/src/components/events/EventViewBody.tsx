import { EventTimetable } from "../event-create/EventTimetable";

export function EventViewBody() {
  // TO DO: link with event creation info, this is sample data
  const today = new Date();
  const dates = Array.from({ length: 8 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  return (
    <div className="flex bg-white h-screen justify-center items-center flex-col">
      <div className="max-w-4xl">
        <EventTimetable
          dates={dates}
        />
      </div>
    </div>
  );
}