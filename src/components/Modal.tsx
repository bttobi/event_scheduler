import { useState, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";
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

  const postToDb = () => {
    if (inputHourRef.current && inputEmailRef.current) {
      try {
        addDate(
          clickedDay,
          inputHourRef.current.value,
          inputEmailRef.current.value
        );
        setErrorHappened(false);
        setNotificationMessage("Dodano rezerwację!");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
      } catch (error: any) {
        setErrorHappened(true);
        setNotificationMessage(
          "Błąd podczas dodawania rezerwacji - spróbuj ponownie..."
        );
        setShowNotification(true);
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
        {isFetching ? (
          <div className="mb-8">
            <TailSpin />
          </div>
        ) : takenHours.length == 0 ? (
          <p className="text-green-400 text-xl font-bold mb-4">
            Cały dzień wolny
          </p>
        ) : (
          <>
            <p className="text-red-400 text-xl font-bold">Zajęte godziny to:</p>
            <ul className="mb-8 max-w-32 overflow-y-auto flex gap-2 flex-wrap justify-center items-center align-center">
              {takenHours.map((day) => {
                return <li key={day}>{day}</li>;
              })}
            </ul>
          </>
        )}

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
        <button className="btn btn-success mt-8" onClick={postToDb}>
          Zatwierdź wizytę
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
