import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import useGetLastReservedDays from '../components/hooks/useGetLastReservedDays';
import ConfirmDeletionModal from '../components/UI/ConfirmDeletionModal';
import isInThePast from '../functions/isInThePast';

const BookedDates = () => {
  const [email, setEmail] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [hour, setHour] = useState<string>('');

  const bookedDays = useGetLastReservedDays(email);
  const auth = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setEmail(user?.email || '');
      else setEmail('');
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center mt-24 flex h-full w-full flex-col items-center justify-center"
      >
        {bookedDays?.length ? (
          <>
            <span className="text-2xl">Moje rezerwacje:</span>
            <ul
              className="mt-8 max-h-96 overflow-y-scroll rounded-lg px-8 py-4"
              style={{ background: 'rgb(3, 105, 161)' }}
            >
              {bookedDays
                ?.sort((a, b) => {
                  const datePartsA = a.day.split('.').reverse();
                  const datePartsB = b.day.split('.').reverse();
                  const dateA = new Date(datePartsA.join('-'));
                  const dateB = new Date(datePartsB.join('-'));
                  return Number(dateA) - Number(dateB);
                })
                ?.map(el => (
                  <li
                    key={el.day}
                    className="mt-4 flex justify-end align-baseline"
                  >
                    <span>{`${el.day} godz. ${el.hour}`}</span>
                    {!isInThePast(el.day, el.hour) ? (
                      <label
                        htmlFor="delete-modal"
                        className="align-center btn-sm btn ml-2  flex items-center justify-center rounded-lg  border-none bg-red-500 px-4 text-white transition-all hover:bg-red-300"
                        onClick={() => {
                          setDay(el.day);
                          setHour(el.hour);
                        }}
                      >
                        usuń
                      </label>
                    ) : (
                      <button
                        disabled
                        className="btn-sm btn ml-2 cursor-not-allowed rounded-lg border-none bg-red-500 px-4"
                      >
                        usuń
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <span className="text-2xl">Brak rezerwacji!</span>
        )}
        <ConfirmDeletionModal day={day} hour={hour} email={email} />
      </motion.div>
    </AnimatePresence>
  );
};

export default BookedDates;
