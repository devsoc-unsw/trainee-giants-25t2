import { useState } from "react";
import type { Event } from "../../types/event.types";
import { EventTimetable } from "../events/EventTimetable";
import { useUser } from "../../hooks/useAuth";
import { getCookie } from "../../cookie/cookie";
import { editEventUserAvailability } from "../../hooks/useEvents";
import { useNavigate } from "react-router-dom";

export function EventTimetableBody({ event }: { event: Event }) {
  // Stores timetable state info
  // Availability format: "YYYY-MM-DD", ["09:00", "09:30", ...]
  const [availabilities, setAvailabilities] = useState<{ date: string; times: string[] }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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
        const message = e?.response?.data?.error || e?.message || "Adding event food recommendations failed.";
        console.log(message);
      }

      navigate(`/event/${eid}/results`)

    } catch (e) {
      setError("Failed to save availability");
    } finally {
      setSubmitting(false);
    }

  }

  return (
    <div className="mx-auto p-4 space-y-4 bg-white">
      <h1 className="text-xl text-center text-black font-bold">Select your availabilities</h1>

      <EventTimetable
        dates={event.eventTimeSpan.dates}
        startHour={parseInt(event.eventTimeSpan.dayStart)}
        endHour={parseInt(event.eventTimeSpan.dayEnd)}
        onChange={updateAvailabilities}
      />

      <div className="flex flex-col items-end gap-3 bg-gray pr-5">
        <button
          onClick={handleDone}
          disabled={submitting || availabilities.length === 0}
          className="px-5 py-2 rounded bg-black text-whte disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Done"}
        </button>

        {error && availabilities.length > 0 && <div className="text-red-600 text-sm">{error}</div>}
      </div>
    </div>
  );
}


