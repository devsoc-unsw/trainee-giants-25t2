import { getEvents } from "../hooks/useEvents";
import { LoadingSpinner } from "../components/homepage/Loading";
import { useUser } from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import { HeaderBar } from "../components/HeaderBar";
import { Footer } from "../components/Footer";

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
        <>
          <div className="flex flex-col h-screen w-screen items-center gap-8">
            <HeaderBar />
            <div className="w-[1280px]">
              <p className="text-4xl font-bold text-black">Events</p>
              {events.map((event: { eventId: string; eventName: string; }) => (
                <p key={event.eventId} className="text-2xl text-black cursor-pointer" onClick={() => navigate("/event/" + event.eventId + "/results")}>{event.eventName}</p>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
