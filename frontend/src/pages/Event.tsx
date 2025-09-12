import { useParams } from "react-router-dom";

import { getEvent } from "../hooks/useEvents";
import { LoadingSpinner } from "../components/homepage/Loading";
import { HeaderBar } from "../components/HeaderBar";

export function Event() {
  const eid = useParams().eid!;
  const { data: event, isLoading } = getEvent(eid);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HeaderBar />
          <div className="flex flex-col h-screen w-screen">
            <p className="text-6xl text-center">{event.eventName}</p>
          </div>
        </>
      )}
    </>
  );
}
