import { CloseIcon } from "Icons";
import Button from "components/Button";
import { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarModal = (props) => {
  const { currentDate, onClose, onSave } = props;

  const [date, setDate] = useState(currentDate);

  //Function to change Date
  const onDateChange = (event) => {
    setDate(event);
  };

  return (
    <section className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-40">
      <section className="flex items-end sm:items-center justify-center min-h-full md:p-4 text-center sm:p-0">
        <section className="relative bg-white rounded-lg m text-left shadow-xl transform transition-all sm:my-8">
          <section className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg">
            <section className="flex justify-between mb-4">
              <h2 className="flex items-center font-bold text-xl text-secondary-900">
                Select Deadline
              </h2>

              <Button type="icon" onClick={onClose}>
                <CloseIcon />
              </Button>
            </section>

            <Calendar onChange={onDateChange} value={date} minDate={new Date()} />

            <section className="flex justify-end items-center mt-5">
              <section className="mr-2">
                <Button type="text" onClick={onClose}>
                  Cancel
                </Button>
              </section>
              <button
                onClick={() => onSave(date)}
                className="px-6 py-2 rounded-full disabled:bg-gray-500 bg-primary-900 text-white text-sm font-bold hover:bg-primary-500 cursor-pointer"
              >
                Save
              </button>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default CalendarModal;
