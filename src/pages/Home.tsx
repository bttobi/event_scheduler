import { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "../components/UI/Modal";
import getTakenDays from "../functions/getTakenDays";
import { UserContext } from "../App";
import { User } from "firebase/auth";

const Home: React.FC = () => {
  const [clickedDay, setClickedDay] = useState<Date>();
  const modalInputRef = useRef<HTMLInputElement>(null);
  const [takenDays, setTakenDays] = useState<string[]>();
  const [user, setUser] = useState<User | null>(null);

  const auth = useContext(UserContext);

  const makeAppointment = (day: Date) => {
    setClickedDay(day);
    if (modalInputRef.current) {
      modalInputRef.current.checked = true;
    }
  };

  //@ts-ignore
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const stringDate = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`;
      if (takenDays?.includes(stringDate)) {
        return "bg-red-500";
      }
    }
  };

  useEffect(() => {
    const days = getTakenDays();
    days.then((res) => setTakenDays(res));
    console.log(takenDays);
  }, [takenDays?.length, clickedDay]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center flex h-full w-full flex-col items-center justify-center"
      >
        {user?.email == null ? (
          <NavLink to="zaloguj">
            <p className="mt-12 text-2xl underline">
              Musisz się zalogować, aby złożyć rezerwację!
            </p>
          </NavLink>
        ) : (
          <>
            <p className="mb-8 mt-8 text-3xl text-white">Wybierz datę:</p>
            <Calendar
              locale="pl"
              onClickDay={(value) => {
                makeAppointment(value);
              }}
              className="w-full rounded-lg bg-sky-700 pb-4 text-3xl text-slate-800 lg:w-1/2"
              tileClassName={tileClassName}
            />
            <input
              ref={modalInputRef}
              type="checkbox"
              id="my-modal-6"
              className="modal-toggle"
            />
            <Modal clickedDay={clickedDay} />
            <p className="mt-8 text-2xl text-white">Legenda:</p>
          </>
        )}
      </motion.main>
      )
    </AnimatePresence>
  );
};

export default Home;
