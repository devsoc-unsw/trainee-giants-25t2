import React, { useRef, useState } from "react";

interface TimetableProps {
  dates: Date[];
  startHour?: number; // 24H time
  endHour?: number;
  onChange?: (slots: { date: string; times: string[] }[]) => void;
}

// default hours being 9AM - 6PM if not given
export function EventTimetable({ dates, startHour = 9, endHour = 18, onChange }: TimetableProps) {
  const timeSlots: { time: string; hasLabel: boolean }[] = [];
  // 30-min time slots
  for (let h = startHour; h <= endHour; h++) {
    timeSlots.push({ time: `${h.toString().padStart(2, "0")}:00`, hasLabel: true });
    if (h < endHour) timeSlots.push({ time: `${h.toString().padStart(2, "0")}:30`, hasLabel: false });
  }

  const columnTemplate = {
    gridTemplateColumns: `max-content repeat(${dates.length}, minmax(120px, 1fr))`
  };

  const formatDate = (d: Date) => d.toLocaleDateString("en-AU", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  const isoDay = (d: Date) => d.toISOString().slice(0, 10);

  const [selected, setSelected] = useState<Set<String>>(new Set());
  const dragRef = useRef(false);
  const refMode = useRef<"add" | "remove">("add");

  const startDrag = (dateIdx: number | null, slotIdx: number | null, e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = true;
    if (dateIdx === null || slotIdx === null) return;

    // Determines selecting or erasing timeslot
    const cell = `${dateIdx}:${slotIdx}`;
    const isOn = selected.has(cell);
    refMode.current = isOn ? "remove" : "add";

    setSelected((prev) => {
      const next = new Set(prev);
      refMode.current === "add" ? next.add(cell) : next.delete(cell);
      return next;
    });
  };

  const dragOverCell = (dateIdx: number, slotIdx: number) => {
    if (!dragRef.current) return;
    const cell = `${dateIdx}:${slotIdx}`;
    setSelected((prev) => {
      const next = new Set(prev);
      refMode.current === "add" ? next.add(cell) : next.delete(cell);
      return next;
    });
  };

  const endDrag = () => {
    if (!dragRef.current) return;
    dragRef.current = false;

    if (!onChange) return;

    // Return updated selection info
    const selectedDates = new Map<number, string[]>();
    for (const cell of selected) {
      const [dateIdxStr, slotIdxStr] = cell.split(":");
      const dateIdx = Number(dateIdxStr);
      const slotIdx = Number(slotIdxStr);
      if (!selectedDates.has(dateIdx)) {
        selectedDates.set(dateIdx, []);
      }
      const date = selectedDates.get(dateIdx);
      const timeSlot = timeSlots[slotIdx].time;
      if (date && timeSlot) {
        date.push(timeSlot);
      }
    }

    const payload: { date: string; times: string[] }[] = [];
    for (const [dateIdx, times] of selectedDates.entries()) {
      times.sort();
      payload.push({ date: isoDay(dates[dateIdx]), times: times });
    }
    onChange(payload);
  };

  // TO DO: simple base timetable assuming max dates length = 8 (will change and adapt with horizontal scroll wheel)
  return (
    <div
      className="rounded-md select-none"
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      {/* Date columns header */}
      <div
        className="grid"
        style={columnTemplate}
      >
        <div className="w-14" />
        {dates.map((d) => (
          <div
            key={d.getTime()}
            className="h-10 flex items-center justify-center px-2 text-gray-800"
          >
            <span className="block w-full text-center text-sm truncate">
              {formatDate(d)}
            </span>
          </div>
        ))}
      </div>

      {/* Rows */}
      {timeSlots.map(({ time, hasLabel }, slotIdx) => (
        <div
          key={time + "-" + slotIdx}
          className="grid"
          style={columnTemplate}
          onMouseDown={(e) => startDrag(null, null, e)}
        >
          {/* Time row labels */}
          <div
            className="h-0.5 flex items-center justify-end pr-3 text-xs text-gray-700 bg-white w-14"
            onMouseDown={(e) => startDrag(null, null, e)}
          >
            {hasLabel ? time : ""}
          </div>

          {/* Grid cells */}
          {dates.map((_, dateIdx) => {
            const cell = `${dateIdx}:${slotIdx}`;
            const isSelected = selected.has(cell);
            return (
              <div
                key={cell}
                className={[
                  "h-7 bg-white border",
                  isSelected ? "bg-emerald-200 border-emerald-400" : "bg-white border-gray-200"
                  ].join(" ")}
                onMouseDown={(e) => startDrag(dateIdx, slotIdx, e)}
                onMouseEnter={() => dragOverCell(dateIdx, slotIdx)}
                title={time}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

