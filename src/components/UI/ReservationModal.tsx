import { AiFillCloseCircle } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import HoursForm from '../Forms/HoursForm';
import useGetTakenHours from '../hooks/useGetTakenHours';

const ReservationModal: React.FC<{
  clickedDay: string;
}> = ({ clickedDay }) => {
  const takenHours = useGetTakenHours(clickedDay);

  return (
    <label htmlFor="reservation-modal" className="modal cursor-pointer">
      <label className="align-center modal-box flex flex-col items-center justify-center">
        <div className="absolute right-2 top-2">
          <label
            htmlFor="reservation-modal"
            className="align-center btn-sm btn flex  items-center justify-center bg-red-500 text-white transition-all hover:bg-red-300"
          >
            <AiFillCloseCircle size={20} />
          </label>
        </div>
        <p className="text-xl font-bold">Wybrany dzień to:</p>
        <p className="mb-8 text-2xl text-blue-500">{clickedDay}</p>
        <AnimatePresence>
          {!takenHours ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4 text-xl font-bold text-green-400"
            >
              Cały dzień wolny
            </motion.p>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold text-red-400"
              >
                Zajęte godziny to:
              </motion.p>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-32 align-center mb-8 flex flex-wrap items-center justify-center gap-2 overflow-y-auto"
              >
                {takenHours?.map((hour: string) => (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={hour}
                  >
                    {hour}
                  </motion.li>
                ))}
              </motion.ul>
            </>
          )}
        </AnimatePresence>
        <HoursForm clickedDay={clickedDay} />
      </label>
    </label>
  );
};

export default ReservationModal;
