import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import useGetLast30Days from '../components/hooks/useGetLast30Days';

const BookedDates = () => {
  const [user, setUser] = useState<string>('');
  const last30Booked = useGetLast30Days(user);
  const auth = useContext(UserContext);

  auth.onAuthStateChanged(user => setUser(user?.email || ''));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center mt-24 flex h-full w-full flex-col items-center justify-center"
      >
        {last30Booked ? (
          <>
            <span className="text-2xl">Moje terminy (ostatnie 30 dni):</span>
            <ul>
              {last30Booked?.map(el => (
                <li key={el.day}>{`${el.day} godz. ${el.hour}`}</li>
              ))}
            </ul>
          </>
        ) : (
          <span className="text-2xl">Brak rezerwacji!</span>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default BookedDates;
