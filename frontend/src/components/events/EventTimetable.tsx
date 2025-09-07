interface TimetableProps {
    dates: Date[];
    startHour?: number; // 24H time
    endHour?: number;
}

// default hours being 9AM - 6PM if not given
export function EventTimetable({ dates, startHour = 9, endHour = 18 }: TimetableProps) {
  const hourLabels: string[] = [];
  for (let h = startHour; h <= endHour; h++) {
    const hourLabel = `${h.toString().padStart(2, "0")}:00`;
    hourLabels.push(hourLabel);
  }

  const formatDate = (d: Date) => d.toLocaleDateString("en-AU", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  // TO DO: simple base timetable assuming max dates length = 8 (will change and adapt with horizontal scroll wheel)
  return (
    <div className="rounded-md">
      {/* Date columns header */}
      <div
        className="grid"
        style={{ gridTemplateColumns: `max-content repeat(${dates.length}, minmax(0, 1fr))`}}
      >
        <div className="w-11" />
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
      {hourLabels.map((time) => (
        <div
          key={time}
          className="grid"
          style={{ gridTemplateColumns: `max-content repeat(${dates.length}, minmax(0, 1fr))`}}
        >
          {/* Time row labels */}
          <div className="h-0.5 flex items-center justify-end pr-3 text-sm text-gray-700">
            {time}
          </div>

          {/* Grid cells */}
          {dates.map((d) => (
            <div
              key={d.getTime() + time}
              className="h-12 bg-white border"
            />
          ))}
        </div>
      ))}
    </div>
  );
}