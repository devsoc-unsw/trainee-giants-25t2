import { useState } from "react";

interface TimeSelectorProps {
  startTime: string;
  endTime: string;
  setStartTime: (t: string) => void;
  setEndTime: (t: string) => void;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({ startTime, endTime, setStartTime, setEndTime }) => {
  const [dropdownOpen, setDropdownOpen] = useState({ start: false, end: false });

  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
    const suffix = i < 12 ? "am" : "pm";
    return `${hour}:00 ${suffix}`;
  });

  const handleOpen = (which: "start" | "end") =>
    setDropdownOpen(which === "start" ? { start: true, end: false } : { start: false, end: true });

  const handleSelect = (which: "start" | "end", value: string) => {
    which === "start" ? setStartTime(value) : setEndTime(value);
    setDropdownOpen({ start: false, end: false });
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="text-black font-medium mb-1">What times might work?</label>
      <div className="flex flex-row items-center justify-between gap-2 relative">

        <div className="flex-1 relative">
          <div
            className="border rounded-md p-2 bg-white cursor-pointer text-black"
            onClick={() => handleOpen("start")}
          >
            {startTime}
          </div>
          {dropdownOpen.start && (
            <div className="absolute z-10 bg-white border rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
              {times.map((t) => (
                <div
                  key={t}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                  onClick={() => handleSelect("start", t)}
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
            onClick={() => handleOpen("end")}
          >
            {endTime}
          </div>
          {dropdownOpen.end && (
            <div className="absolute z-10 bg-white border rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
              {times.map((t) => (
                <div
                  key={t}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                  onClick={() => handleSelect("end", t)}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
