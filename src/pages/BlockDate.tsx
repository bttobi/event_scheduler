import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import Calendar from 'react-calendar';
import { stringifyDate } from '../functions/stringifyDate';
import useGetBlockedDays from '../components/hooks/useGetBlockedDays';
import BlockDateModal from '../components/UI/BlockDateModal';
import { AnimatePresence, motion } from 'framer-motion';

const BlockDate = () => {
  const [email, setEmail] = useState<string>('');
  const [clickedDay, setClickedDay] = useState<string>('');
  const modalInputRef = useRef<HTMLInputElement>(null);
  const auth = useContext(UserContext);
  const blockedDays = useGetBlockedDays();

  const openModal = (day: Date) => {
    setClickedDay(stringifyDate(day));
    if (modalInputRef.current) {
      modalInputRef.current.checked = true;
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const day = blockedDays?.find(day => day === stringifyDate(date));
      if (day) {
        return 'bg-green-500';
      }
    }
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    return (
      date.getTime() <= new Date().getTime() ||
      date.getFullYear() > new Date().getFullYear() + 5
    );
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setEmail(user?.email || '');
      else setEmail('');
    });

    return () => unsubscribe();
  }, [auth]);
  return email === 'admin@admin.admin' ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center mt-12 flex h-full w-full flex-col items-center justify-center"
      >
        <p className="mb-8 mt-8 text-center text-3xl text-white">
          Wybierz datę do zablokowania:
        </p>
        <Calendar
          locale="pl"
          onClickDay={value => {
            openModal(value);
          }}
          className="w-full rounded-lg bg-sky-700 pb-4 text-3xl text-slate-800 lg:w-1/2"
          tileClassName={tileClassName}
          tileDisabled={tileDisabled}
          view="month"
        />
        <input
          ref={modalInputRef}
          type="checkbox"
          id="block-modal"
          className="modal-toggle"
        />
        <BlockDateModal clickedDay={clickedDay} />
        <ul className="mt-8 flex flex-col items-center justify-start text-2xl text-white">
          <span>Legenda: </span>
          <li className="mb-2 flex w-full">
            <div className="ml-4 mr-4 h-8 w-10 bg-red-500 text-center text-black">
              DD
            </div>
            - brak możliwosci edycji
          </li>
          <li className="flex w-full">
            <div className="ml-4 mr-4 h-8 w-10 bg-green-500 text-center text-black">
              DD
            </div>
            - data zablokowana
          </li>
        </ul>
      </motion.div>
    </AnimatePresence>
  ) : (
    'BRAK DOSTĘPU - NIE JESTEŚ ADMINISTRATOREM'
  );
};

export default BlockDate;
