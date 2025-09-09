interface DateModeToggleProps {
  dateMode: "dateTime" | "datesOnly";
  setDateMode: (mode: "dateTime" | "datesOnly") => void;
}

export const DateModeToggle: React.FC<DateModeToggleProps> = ({ dateMode, setDateMode }) => (
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
);
