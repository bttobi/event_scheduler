import { useState, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";
import addDate from "../functions/addDate";
import Alert from "./Alert";

const Modal: React.FC<{
  clickedDay: Date | undefined;
  takenHours: string[];
  isFetching: boolean;
}> = ({ clickedDay, takenHours, isFetching }) => {
  const inputHourRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [errorHappened, setErrorHappened] = useState<boolean>(false);
  const [isPostingToDb, setIsPostingToDb] = useState<boolean>(false);

  const postToDb = () => {
    if (inputHourRef.current && inputEmailRef.current) {
      setIsPostingToDb(true);
      try {
        addDate(
          clickedDay,
          inputHourRef.current.value,
          inputEmailRef.current.value
        );
        setErrorHappened(false);
        setNotificationMessage("Dodano rezerwację!");
        setShowNotification(true);
      } catch (error: any) {
        setErrorHappened(true);
        setNotificationMessage(
          "Błąd podczas dodawania rezerwacji - spróbuj ponownie..."
        );
        setShowNotification(true);
      } finally {
        setIsPostingToDb(false);
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
      }
    }
  };

  return (
    <label htmlFor="my-modal-6" className="modal cursor-pointer">
      <label className="modal-box relative flex flex-col justify-center align-center items-center ">
        <div className="right-2 absolute top-2">
          <label
            htmlFor="my-modal-6"
            className="btn btn-sm bg-red-500 transition-all  hover:bg-red-300 text-white flex justify-center align-center items-center"
          >
            <AiFillCloseCircle size={20} />
          </label>
        </div>
        <p className="font-bold text-xl">Wybrany dzień to:</p>
        <p className="text-2xl mb-8 text-blue-500">{`${clickedDay?.getDate()}.${
          clickedDay && clickedDay?.getMonth() + 1
        }.${clickedDay?.getFullYear()}`}</p>
        <AnimatePresence>
          {isFetching ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <TailSpin />
            </motion.div>
          ) : takenHours.length == 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-green-400 text-xl font-bold mb-4"
            >
              Cały dzień wolny
            </motion.p>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-xl font-bold"
              >
                Zajęte godziny to:
              </motion.p>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-8 max-w-32 overflow-y-auto flex gap-2 flex-wrap justify-center items-center align-center"
              >
                {takenHours.map((day) => {
                  return <li key={day}>{day}</li>;
                })}
              </motion.ul>
            </>
          )}
        </AnimatePresence>

        <label htmlFor="hour">Wybierz godzinę:</label>
        <input
          name="hour"
          type="time"
          className="input input-bordered w-48 max-w-xs bg-slate-700"
          step="1800"
          ref={inputHourRef}
          required
        />
        <label htmlFor="email" className="mt-8">
          Podaj adres email:
        </label>
        <input
          name="email"
          type="email"
          className="input input-bordered w-48 max-w-xs bg-slate-700"
          ref={inputEmailRef}
          required
        />
        <button className="btn btn-success mt-8 w-32" onClick={postToDb}>
          {isPostingToDb ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TailSpin />
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Zatwierdź wizytę
            </motion.p>
          )}
        </button>
      </label>
      <AnimatePresence>
        {showNotification && (
          <Alert
            errorHappened={errorHappened}
            notificationMessage={notificationMessage}
          />
        )}
      </AnimatePresence>
    </label>
  );
};

export default Modal;
