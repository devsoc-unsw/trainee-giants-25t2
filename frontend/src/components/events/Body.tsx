import { useState } from "react";
import { motion } from "framer-motion";
import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";
import { useNavigate } from "react-router-dom";

export function WhiteBody() {
  const [eventName, setEventName] = useState("");
  const [dateMode, setDateMode] = useState<"dateTime" | "datesOnly">("dateTime");
  const [startTime, setStartTime] = useState("9:00 am");
  const [endTime, setEndTime] = useState("5:00 pm");

  const [timeDropdownOpen, setTimeDropdownOpen] = useState<{ start: boolean; end: boolean }>({
    start: false,
    end: false,
  });
  const [specificDates, setSpecificDates] = useState<Date[]>([]);

  const isFormValid = eventName.trim().length > 0;

  const navigate = useNavigate();
  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
    const suffix = i < 12 ? "am" : "pm";
    return `${hour}:00 ${suffix}`;
  });

  return (
    <div className="flex bg-white h-screen justify-center items-center flex-col">
      <div className="bg-white rounded-2xl shadow-xl border w-[500px] p-6 relative max-h-[800px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">New event</h2>
          <h4
            className="text-md text-black cursor-pointer"
            onClick={() => navigate('/')}
          > 
            Back
          </h4>
        </div>

        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="Name your event…"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className={`border rounded-md p-2 bg-white text-black ${!isFormValid ? "border-red-500" : "border-gray-300"}`}
          />
          {!isFormValid && (
            <span className="text-red-500 text-sm mt-1">Event name is required</span>
          )}
        </div>

        <div className="flex mb-4 gap-2">
          <button
            onClick={() => setDateMode("dateTime")}
            className="flex-1 px-4 py-2 rounded-md border border-black bg-white text-black"
          >
            Dates and times
          </button>
          <button
            onClick={() => setDateMode("datesOnly")}
            className="flex-1 px-4 py-2 rounded-md border border-black bg-white text-black"
          >
            Dates only
          </button>
        </div>

        {dateMode === "dateTime" && (
          <div className="flex flex-col mb-4">
            <label className="text-black font-medium mb-1">What times might work?</label>
            <div className="flex flex-row items-center justify-between gap-2 relative">
              <div className="flex-1 relative">
                <div
                  className="border rounded-md p-2 bg-white cursor-pointer text-black"
                  onClick={() => setTimeDropdownOpen({ start: true, end: false })}
                >
                  {startTime}
                </div>
                {timeDropdownOpen.start && (
                  <div className="absolute z-10 bg-white border rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
                    {times.map((t) => (
                      <div
                        key={t}
                        className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                        onClick={() => {
                          setStartTime(t);
                          setTimeDropdownOpen({ start: false, end: false }); // close all
                        }}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="flex items-center text-black">to</span>
              <div className="flex-1 relative">
                <div
                  className="border rounded-md p-2 bg-white cursor-pointer text-black"
                  onClick={() => setTimeDropdownOpen({ start: false, end: true })}
                >
                  {endTime}
                </div>
                {timeDropdownOpen.end && (
                  <div className="absolute z-10 bg-white border rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
                    {times.map((t) => (
                      <div
                        key={t}
                        className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                        onClick={() => {
                          setEndTime(t);
                          setTimeDropdownOpen({ start: false, end: false }); // close all
                        }}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col mb-4">
          <label className="text-black font-medium mb-1">What dates might work?</label>
          <div className="w-full rounded-md p-2 bg-white text-black flex items-center justify-center">
            <DayPicker
              animate
              mode="multiple"
              selected={specificDates}
              onSelect={(dates) => setSpecificDates(dates || [])}
            />
          </div>
        </div>

        <motion.button
          disabled={!isFormValid}
          whileHover={isFormValid ? { scale: 1.05 } : {}}
          whileTap={isFormValid ? { scale: 0.95 } : {}}
          className={`w-full py-3 mt-2 rounded-md font-bold text-white ${
            isFormValid
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Create event
        </motion.button>

        {!isFormValid && (
          <span className="text-red-500 text-sm mt-1 block">Please fix form errors before continuing</span>
        )}
      </div>
    </div>
  );
}
