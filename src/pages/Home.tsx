import { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ReservationModal from '../components/UI/ReservationModal';
import { UserContext } from '../contexts/UserContext';
import { User } from 'firebase/auth';
import useGetTakenDays from '../components/hooks/useGetTakenDays';
import { stringifyDate } from '../functions/stringifyDate';

const Home: React.FC = () => {
  const takenDays = useGetTakenDays();
  const [clickedDay, setClickedDay] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);

  const auth = useContext(UserContext);

  const makeAppointment = (day: Date) => {
    setClickedDay(stringifyDate(day));
    if (modalInputRef.current) {
      modalInputRef.current.checked = true;
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const day = takenDays?.find(
        day => day?.data[0]?.day === stringifyDate(date)
      );
      if (day?.data?.length === 1) {
        return 'bg-yellow-500';
      } else if (day?.data?.length === 2) {
        return 'bg-orange-500';
      } else if (day?.data?.length >= 3) {
        return 'bg-red-500 disabled';
      }
    }
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    const day = takenDays?.find(
      day => day?.data[0]?.day === stringifyDate(date)
    );
    if (view === 'year') {
      return date.getMonth() + 1 < new Date().getMonth() + 1;
    }
    return date <= new Date() || day?.data?.length >= 3;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUser(user);
      else setUser(null);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center mt-24 flex h-full w-full flex-col items-center justify-center"
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
              onClickDay={value => {
                makeAppointment(value);
              }}
              className="w-full rounded-lg bg-sky-700 pb-4 text-3xl text-slate-800 lg:w-1/2"
              tileClassName={tileClassName}
              tileDisabled={tileDisabled}
            />
            <input
              ref={modalInputRef}
              type="checkbox"
              id="reservation-modal"
              className="modal-toggle"
            />
            <ReservationModal clickedDay={clickedDay} />
            <ul className="mt-8 flex flex-col items-center justify-start text-2xl text-white">
              <span>Legenda: </span>
              <li className="mb-2 flex w-full">
                <div className="ml-4 mr-4 h-8 w-10 bg-yellow-500 text-center text-black">
                  DD
                </div>
                - są jeszcze wolne terminy
              </li>
              <li className="mb-2 flex w-full">
                <div className="ml-4 mr-4 h-8 w-10 bg-orange-500 text-center text-black">
                  DD
                </div>
                - dostępny jeszcze jeden wolny termin
              </li>
              <li className="flex w-full">
                <div className="ml-4 mr-4 h-8 w-10 bg-red-500 text-center text-black">
                  DD
                </div>
                - brak wolnych terminów
              </li>
            </ul>
          </>
        )}
      </motion.main>
    </AnimatePresence>
  );
};

export default Home;
