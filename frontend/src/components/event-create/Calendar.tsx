import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { motion } from "framer-motion";

interface MiniCalendarProps {
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({ selectedDates, setSelectedDates }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col mb-4 w-full rounded-md p-2 bg-white text-black items-center justify-center"
  >
    <DayPicker
      animate
      mode="multiple"
      selected={selectedDates}
      onSelect={(dates) => setSelectedDates(dates || [])}
    />
  </motion.div>
);
