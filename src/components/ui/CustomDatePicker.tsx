import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CustomDatePickerProps = {
  label: string;
  onSelectDate: (date: Date | null) => void;
  paymentDate: Date;
};

// Define the component
function CustomDatePicker({
  label,
  paymentDate,

  onSelectDate,
}: CustomDatePickerProps) {
  // Set the state with a Date type or null for initial value

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base">{label}</label>
      <DatePicker
        onChange={(date) => onSelectDate(date)} // Ensure the date can be null
        selected={paymentDate}
        placeholderText="dd/mm/yyyy"
        dateFormat="dd/MM/yyyy"
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
