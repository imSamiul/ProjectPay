import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CustomDatePickerProps = {
  label: string;
};

// Define the component
function CustomDatePicker({ label }: CustomDatePickerProps) {
  // Set the state with a Date type or null for initial value
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base">{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)} // Ensure the date can be null
        placeholderText="dd/mm/yyyy"
        className="input input-bordered w-full z-20"
        popperPlacement="top-end" // This places the calendar above the input
        popperProps={{
          strategy: "fixed",
          // use this to make the popper position: fixed
        }}
      />
    </div>
  );
}

export default CustomDatePicker;
