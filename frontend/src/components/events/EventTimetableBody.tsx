import { useState } from "react";
import type { Event } from "../../types/event.types";
import { EventTimetable } from "./EventTimetable";
import { useUser } from "../../hooks/useAuth";
import { getCookieName, getCookieUUID } from "../../cookie/cookie";
import { editEventUserAvailability, getAllAvailabilities } from "../../hooks/useEvents";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/user.types";

export function EventTimetableBody({ event }: { event: Event }) {
  const [availabilities, setAvailabilities] = useState<{ date: string; times: string[] }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [showNamePopup, setShowNamePopup] = useState(false);

  const { data: allAvailabilities, isLoading: availLoading } = getAllAvailabilities(event.eventId);
  const { data: user } = useUser();

  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);

  const updateAvailabilities = (payload: { date: string; times: string[] }[]) => {
    setAvailabilities(payload);
  };

  const navigate = useNavigate();
  const handleDone = async () => {
    try {
      setSubmitting(true);
      setError(null);

      let uid: string;
      if (user) {
        uid = user.userId;
      } else {
        uid = getCookieUUID()!;
      }

      // will do handling in /vote
      // if (!uid) {
      //   uid = self.crypto.randomUUID();
      //   setCookie(uid, expirationDate);
      // }


      let newUser: User;
      if (user) {
        newUser = {
          userId: uid,
          email: user.email,
          name: user.name,
        }
      } else {
        newUser = {
          userId: uid,
          email: "",
          name: getCookieName()!,
        }
      }

      const eid = event.eventId;
      const payload: any = { eid, newUser, slots: availabilities };

      try {
        await editEventUserAvailability(payload);
      } catch (e: any) {
        const message = e?.response?.data?.error || e?.message || "Adding event user availabilities failed.";
        console.log(message);
        setError(message);
      }

      navigate(`/event/${eid}/results`)
    } catch {
      setError("Failed to save availability");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 space-y-4 bg-white rounded-2xl max-w-[1280px] min-w-[770px] min-h-[600px] shadow-lg flex flex-col mt-5 gap-2 items-center justify-center">
      <h1 className="text-xl text-center text-black font-bold pt-3">
        Select your availabilities
      </h1>

      {!availLoading && (allAvailabilities?.avai?.length ?? 0) === 0 && (
        <p className="text-center text-gray-500">No users have submitted availabilities yet.</p>
      )}

      <div className="flex flex-row gap-10 w-full flex-1 overflow-auto justify-center">
        <EventTimetable
          dates={event.eventTimeSpan.dates}
          startHour={parseInt(event.eventTimeSpan.dayStart)}
          endHour={parseInt(event.eventTimeSpan.dayEnd)}
          onChange={updateAvailabilities}
        />
      </div>

      <button
        onClick={handleDone}
        disabled={submitting || availabilities.length === 0}
        className="px-3 py-2 w-[200px] bg-black text-white font-bold rounded-lg text-lg disabled:opacity-50 disabled:pointer-events-none hover:bg-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      >
        {submitting ? "Saving..." : "Done"}
      </button>

      {error && availabilities.length > 0 && <div className="text-red-600 text-sm">{error}</div>}

      {showNamePopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-96">
            <h2 className="text-lg text-black font-bold">Enter your name</h2>
            <input
              type="text"
              placeholder="Your name"
              className="border p-2 rounded"
              onChange={(e) => setName(e.target.value)}
            />
            <div
              className="bg-black text-white px-4 py-2 rounded hover:bg-orange-500"
              onClick={() => {
                if (name && name.trim() !== "") {
                  setShowNamePopup(false);
                  setError(null);
                }
              }}
            >
              Save
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
