import { useParams } from "react-router-dom";
import { useState } from "react";

import { getEvent } from "../hooks/useEvents";
import { LoadingSpinner } from "../components/homepage/Loading";
import { EventTimetableBody } from "../components/events/EventTimetableBody";
import { HeaderBar } from "../components/HeaderBar";
import { Footer } from "../components/Footer";

export function EventAvailability() {
  const eid = useParams().eid!;
  const { data, isLoading } = getEvent(eid);
  const event = data!;
  const [copied, setCopied] = useState(false);

  const formatRange = (dates: string[]) => {
    const first = new Date(dates[0]);
    const last = new Date(dates[dates.length - 1]);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(first.getMonth() + 1)}/${pad(first.getDate())} - ${pad(last.getMonth() + 1)}/${pad(last.getDate())}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    });
  };

  return (
    <>
    {isLoading ? (
      <div className="flex flex-col h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    ) : (
      <>
        <div className="flex flex-col h-screen w-screen items-center justify-center">
          <div className="flex flex-col h-full w-full bg-white items-center">
            <HeaderBar />

            <div className="flex justify-around items-center px-8 py-4 border-b w-full">
              <div className="flex flex-col">
                <p className="text-2xl font-semibold text-black">{event.eventName}</p>
                <p className="text-md text-gray-600">{formatRange(event.eventTimeSpan.dates)}</p>
              </div>

            <div 
              onClick={handleCopyLink}
              className="px-6 py-3 bg-[#E98657] text-white font-bold rounded-lg text-md hover:bg-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            >
                {copied ? "Copied!" : "Copy link"}
              </div>
            </div>

            <EventTimetableBody event={event} />
          </div>
        </div>
        <Footer />
      </>
    )}
    </>
  );
}
