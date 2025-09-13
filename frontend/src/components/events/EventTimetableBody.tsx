import { useState } from "react";
import type { Event } from "../../types/event.types";
import { EventTimetable } from "./EventTimetable";
import { useUser } from "../../hooks/useAuth";
import { getCookie } from "../../cookie/cookie";
import { editEventUserAvailability } from "../../hooks/useEvents";

export function EventTimetableBody({ event }: { event: Event }) {
  // Stores timetable state info
  // Availability format: "YYYY-MM-DD", ["09:00", "09:30", ...]
  const [availabilities, setAvailabilities] = useState<{ date: string; times: string[] }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="mx-40 p-4 space-y-4 bg-white rounded-2xl">
      <h1 className="text-xl text-center text-black font-bold pt-3">Select your availabilities</h1>

      <EventTimetable
        dates={event.eventTimeSpan.dates}
        startHour={parseInt(event.eventTimeSpan.dayStart)}
        endHour={parseInt(event.eventTimeSpan.dayEnd)}
        onChange={updateAvailabilities}
      />

      <div className="flex flex-col items-center bg-gray pt-1">
        <button
          onClick={handleDone}
          disabled={submitting || availabilities.length === 0}
          className="px-5 py-2 bg-black text-white font-bold rounded-lg text-lg disabled:opacity-50 disabled:pointer-events-none hover:bg-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
        >
          {submitting ? "Saving..." : "Done"}
        </button>

        {error && availabilities.length > 0 && <div className="text-red-600 text-sm">{error}</div>}
      </div>
    </div>
  );
}


