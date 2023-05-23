import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "./components/Modal";

const App: React.FC = () => {
  const [clickedDay, setClickedDay] = useState<Date>();
  const modalInputRef = useRef<HTMLInputElement>(null);

  const makeAppointment = (day: Date) => {
    setClickedDay(day);
    if (modalInputRef.current) {
      modalInputRef.current.checked = true;
    }
  };

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full flex flex-col justify-center align-center items-center"
      >
        <p className="text-3xl mb-8 text-white">Wybierz datę:</p>
        <Calendar
          locale="pl"
          onClickDay={(value) => {
            makeAppointment(value);
          }}
          className="text-slate-800 bg-sky-700 rounded-lg lg:w-1/2 w-full text-3xl pb-4"
        />
        <input
          ref={modalInputRef}
          type="checkbox"
          id="my-modal-6"
          className="modal-toggle"
        />
        <Modal clickedDay={clickedDay} />
        <p className="text-2xl mt-8 text-white">Legenda:</p>
      </motion.main>
    </AnimatePresence>
  );
};

export default App;
