import { useState } from "react";
import { EventTimetable } from "../events/EventTimetable";

export function EventTimetableBody() {
  // TODO: link with event creation info, this is sample data
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
  const startHour = 9;
  const endHour = 17;

  type AvailabilitySlot = { date: string; times: string[] }; // format: "YYYY-MM-DD", ["09:00", "09:30", ...]

  // Stores timetable state info
  const [availabilities, setAvailabilities] = useState<AvailabilitySlot[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAvailabilities = (payload: AvailabilitySlot[]) => {
    // Payload is all selected 30-min slots after update
    setAvailabilities(payload);
  }

  const handleDone = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // TODO: POST REQ TO BACKEND
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
        dates={dates}
        startHour={startHour}
        endHour={endHour}
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


