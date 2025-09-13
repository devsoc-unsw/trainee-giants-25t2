import { useParams } from "react-router-dom";

import { getEvent } from "../hooks/useEvents";
import { LoadingSpinner } from "../components/homepage/Loading";
import { EventTimetableBody } from "../components/events/EventTimetableBody";

export function EventAvailability() {
  const eid = useParams().eid!;
  const { data, isLoading } = getEvent(eid);
  const event = data!;

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-orange-200 to-orange-700 overflow-hidden">
          <p className="text-6xl font-bold text-orange-500 text-center py-11">{event.eventName}</p>
          <EventTimetableBody event={event} />
        </div>
      )}
    </>
  );
}
