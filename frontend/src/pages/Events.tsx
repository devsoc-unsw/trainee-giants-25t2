import { getEvents } from "../hooks/useEvents";
import { LoadingSpinner } from "../components/homepage/Loading";
import { useUser } from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";

export function Events() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { data: events, isLoading } = getEvents(user!.userId);

  // TODO: probably give a brief outline of details for each event

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col h-screen w-screen pl-64">
          <p className="text-6xl">Events</p>
          {events.map((event: { eventId: string, eventName: string }) => (
            <p key={event.eventId} className="text-2xl cursor-pointer" onClick={() => navigate("/event/" + event.eventId)}>{event.eventName}</p>
          ))}
        </div>
      )}
    </>
  );
}
