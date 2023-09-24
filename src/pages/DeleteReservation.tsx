import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import useGetTakenDays from '../components/hooks/useGetTakenDays';
import isInThePast from '../functions/isInThePast';
import { AnimatePresence, motion } from 'framer-motion';
import ConfirmDeletionModal from '../components/UI/ConfirmDeletionModal';
import { ReservationEntry } from '../functions/addDate';

const DeleteReservation = () => {
  const [email, setEmail] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [hour, setHour] = useState<string>('');
  const [emailToDelete, setEmailToDelete] = useState<string>('');
  const auth = useContext(UserContext);
  const takenDays = useGetTakenDays();

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
        className="align-center mt-24 flex h-full w-full flex-col items-center justify-center"
      >
        {takenDays ? (
          <>
            <span className="text-2xl">Wszystkie rezerwacje:</span>
            <ul
              className="mt-8 max-h-96 overflow-y-scroll rounded-lg px-8 py-4"
              style={{ background: 'rgb(3, 105, 161)' }}
            >
              {takenDays
                ?.map(el => el?.data)
                .flat()
                ?.sort((a: ReservationEntry, b: ReservationEntry) => {
                  const datePartsA = a.day.split('.').reverse();
                  const datePartsB = b.day.split('.').reverse();
                  const dateA = new Date(datePartsA.join('-'));
                  const dateB = new Date(datePartsB.join('-'));
                  return Number(dateA) - Number(dateB);
                })
                .map(
                  (obj: ReservationEntry) =>
                    !isInThePast(obj.day, obj.hour) && (
                      <li
                        key={obj.day + obj.hour + obj.email}
                        className="mt-4 flex justify-end align-baseline"
                      >
                        <span>{`${obj.day} godz. ${obj.hour} przez: ${obj.email}`}</span>
                        <label
                          htmlFor="delete-modal"
                          className="align-center btn-sm btn ml-2  flex items-center justify-center rounded-lg  border-none bg-red-500 px-4 text-white transition-all hover:bg-red-300"
                          onClick={() => {
                            setDay(obj.day);
                            setHour(obj.hour);
                            setEmailToDelete(obj.email);
                          }}
                        >
                          usuń
                        </label>
                      </li>
                    )
                )}
            </ul>
          </>
        ) : (
          <span className="text-2xl">Brak rezerwacji!</span>
        )}
        <ConfirmDeletionModal day={day} hour={hour} email={emailToDelete} />
      </motion.div>
    </AnimatePresence>
  ) : (
    <div>BRAK DOSTĘPU - NIE JESTEŚ ADMINISTRATOREM</div>
  );
};

export default DeleteReservation;
