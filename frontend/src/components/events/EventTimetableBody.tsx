import { useState } from "react";
import type { Event } from "../../types/event.types";
import { EventTimetable } from "./EventTimetable";
import { useUser } from "../../hooks/useAuth";
import { getCookie } from "../../cookie/cookie";
import { editEventUserAvailability, getAllAvailabilities } from "../../hooks/useEvents";
import { UserAvailability } from "./AvailabilityList";


export function EventTimetableBody({ event }: { event: Event }) {
  // Stores timetable state info
  // Availability format: "YYYY-MM-DD", ["09:00", "09:30", ...]
  const [availabilities, setAvailabilities] = useState<{ date: string; times: string[] }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: allAvailabilities, isLoading: availLoading } = getAllAvailabilities(event.eventId);
  const updateAvailabilities = (payload: { date: string; times: string[] }[]) => {
    // Payload is all selected 30-min slots after update
    setAvailabilities(payload);
  }

  const { data: user } = useUser();
 
  const handleDone = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // Post req to backend
      let uid: string;
      if (user) {
        uid = user.userId;
      } else {
        uid = getCookie()!;
      }

      const eid = event.eventId;
      const payload = { eid, uid, slots: availabilities };
      try {
        await editEventUserAvailability(payload);
      } catch (e: any) {
        const message = e?.response?.data?.error || e?.message || "Adding event user availabilities failed.";
        console.log(message);
      }
    } catch (e) {
      setError("Failed to save availability");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-4 space-y-4 bg-white rounded-2xl max-w-[1280px] min-w-[770px] min-h-[600px] shadow-lg flex flex-col mt-5 gap-2 items-center justify-center">
      <h1 className="text-xl text-center text-black font-bold pt-3">
        Select your availabilities
      </h1>

      {!availLoading && (allAvailabilities?.avai?.length ?? 0) === 0 && (
        <p className="text-center text-gray-500">No users have submitted availabilities yet.</p>
      )}

      <div className="flex flex-row gap-10 w-full flex-1 overflow-auto items-center justify-center"> 
        <EventTimetable
          dates={event.eventTimeSpan.dates}
          startHour={parseInt(event.eventTimeSpan.dayStart)}
          endHour={parseInt(event.eventTimeSpan.dayEnd)}
          onChange={updateAvailabilities}
          allAvailabilities={allAvailabilities?.avai}
        />
        {allAvailabilities?.avai?.map((u: any, idx: number) => (
          <UserAvailability key={idx} user={u} />
        ))}
      </div>
      
      <button
        onClick={handleDone}
        disabled={submitting || availabilities.length === 0}
        className="px-3 py-2 w-[200px] bg-black text-white font-bold rounded-lg text-lg disabled:opacity-50 disabled:pointer-events-none hover:bg-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      >
        {submitting ? "Saving..." : "Done"}
      </button>

      {error && availabilities.length > 0 && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
}


