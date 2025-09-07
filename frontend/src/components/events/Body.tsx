import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventNameInput } from "./EventNameInput";
import { DateModeToggle } from "./Date";
import { TimeSelector } from "./SelectTime";
import { MiniCalendar } from "./Calendar";
import { CreateButton } from "./Button";

import { AnimatePresence } from "framer-motion";

export function WhiteBody() {
  const [eventName, setEventName] = useState("");
  const [dateMode, setDateMode] = useState<"dateTime" | "datesOnly">("dateTime");
  const [startTime, setStartTime] = useState("9:00 am");
  const [endTime, setEndTime] = useState("5:00 pm");
  const [specificDates, setSpecificDates] = useState<Date[]>([]);
  const isFormValid = eventName.trim().length > 0;
  const navigate = useNavigate();

  return (
    <div className="flex bg-white h-screen justify-center items-center flex-col">
      <div className="bg-white rounded-2xl shadow-xl border w-[500px] p-6 relative max-h-[800px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">New event</h2>
          <h4
            className="text-md text-black cursor-pointer"
            onClick={() => navigate('/')}
          >Back</h4>
        </div>

        <EventNameInput value={eventName} onChange={setEventName} isValid={isFormValid} />

        <DateModeToggle dateMode={dateMode} setDateMode={setDateMode} />

        {dateMode === "dateTime" && (
          <TimeSelector
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
          />
        )}

        <label className="text-black font-medium mb-1">What dates might work?</label>
        <AnimatePresence mode="wait">
          <MiniCalendar 
            key={dateMode} 
            selectedDates={specificDates} 
            setSelectedDates={setSpecificDates} 
          />
        </AnimatePresence>

        // TODO logic
        <CreateButton disabled={!isFormValid} onClick={() => console.log("Create event")} />

        {!isFormValid && (
          <span className="text-red-500 text-sm mt-1 disable">
            Please fix form errors before continuing
          </span>
        )}
      </div>
    </div>
  );
}