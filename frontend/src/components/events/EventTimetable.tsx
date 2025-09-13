import React, { useEffect, useRef, useState } from "react";

interface TimetableProps {
  dates: Date[];
  startHour: number; // 24H time
  endHour: number;
  onChange?: (slots: { date: string; times: string[] }[]) => void;
  allAvailabilities?: { uid: string; slots: { date: string; times: string[] }[] }[];
}

// default hours being 9AM - 6PM if not given
export function EventTimetable({ dates, startHour, endHour, onChange, allAvailabilities}: TimetableProps) {
  const timeSlots: { time: string; hasLabel: boolean }[] = [];
  // 30-min time slots
  for (let h = startHour; h <= endHour; h++) {
    timeSlots.push({ time: `${h.toString().padStart(2, "0")}:00`, hasLabel: true });
    if (h < endHour) timeSlots.push({ time: `${h.toString().padStart(2, "0")}:30`, hasLabel: false });
  }

  const columnTemplate = {
    gridTemplateColumns: `3.5rem repeat(${dates.length}, minmax(0, 1fr))`
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-AU", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  }

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

  const endDrag = async () => {
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

    const slots: { date: string; times: string[] }[] = [];
    for (const [dateIdx, times] of selectedDates.entries()) {
      times.sort();
      slots.push({ date: isoDay(new Date(dates[dateIdx])), times: times });
    }

    onChange(slots);
  };

  const slotCounts = new Map<string, number>();

  useEffect(() => {
    if (!allAvailabilities) return;
    const newSelected = new Set<string>();

    allAvailabilities.forEach(user => {
      user.slots.forEach(slot => {
        slot.times.forEach(time => {
          const dateIdx = dates.findIndex(d => new Date(d).toISOString().slice(0,10) === slot.date);
          if (dateIdx !== -1) {
            const slotIdx = timeSlots.findIndex(ts => ts.time === time);
            if (slotIdx !== -1) {
              const key = `${dateIdx}:${slotIdx}`;
              newSelected.add(key);
            }
          }
        });
      });
    });

    setSelected(newSelected);
  }, [allAvailabilities]);

  const maxCount = Math.max(...Array.from(slotCounts.values()), 1);

  return (
    <div
      className="rounded-md select-none w-[80%] h-full overflow-auto"
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      {/* Date columns header */}
      <div
        className="grid"
        style={columnTemplate}
      >
        <div className="w-14" />
        {dates.map((d: Date) => (
          <div
            key={new Date(d).getTime()}
            className="h-10 flex items-center justify-center px-2 font-semibold text-gray-800"
          >
            <span className="block w-full text-center text-sm truncate">
              {formatDate(new Date(d))}
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
            className="h-0.5 flex items-center justify-end pr-3 text-xs font-bold text-gray-600 bg-white w-14"
            onMouseDown={(e) => startDrag(null, null, e)}
          >
            {hasLabel ? time : ""}
          </div>

          {/* Grid cells */}
          {dates.map((_, dateIdx) => {
            const cell = `${dateIdx}:${slotIdx}`;
            const count = slotCounts.get(cell) || 0;

            const intensity = Math.min(100 + Math.floor((count / maxCount) * 500), 600);

            const isSelected = selected.has(cell);
              return (
                <div
                  key={cell}
                  className={[
                    "h-7 border cursor-pointer",
                    isSelected
                      ? "bg-emerald-500 border-emerald-700"
                      : `bg-emerald-${intensity} border-emerald-${Math.min(intensity + 200, 800)}`
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

