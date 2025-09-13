import { useParams } from "react-router-dom";

import { getEvent } from "../hooks/useEvents";
import { LoadingSpinner } from "../components/homepage/Loading";
import { EventTimetableBody } from "../components/events/EventViewBody";
import { HeaderBar } from "../components/HeaderBar";

export function Event() {
  const eid = useParams().eid!;
  const { data, isLoading } = getEvent(eid);
  const event = data!;

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col h-screen w-screen">
          <HeaderBar />
          <p className="text-6xl text-center">{event.eventName}</p>
          <EventTimetableBody event={event} />
        </div>
      )}
    </>
  );
}
