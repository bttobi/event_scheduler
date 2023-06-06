import { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";
import HoursForm from "../Forms/HoursForm";
import getTakenHours from "../../functions/getTakenHours";

const Modal: React.FC<{
  clickedDay: Date | undefined;
}> = ({ clickedDay }) => {
  const [errorHours, setErrorHours] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [takenHours, setTakenHours] = useState<string[]>([""]);

  useEffect(() => {
    setIsFetching(true);
    try {
      getTakenHours(clickedDay).then((res) => {
        setTakenHours(res);
      });
      setErrorHours(false);
    } catch (errors: any) {
      setErrorHours(true);
    }
    setIsFetching(false);
  }, [clickedDay, takenHours]);

  return (
    <label htmlFor="my-modal-6" className="modal cursor-pointer">
      <label className="align-center modal-box relative flex flex-col items-center justify-center ">
        <div className="absolute right-2 top-2">
          <label
            htmlFor="my-modal-6"
            className="align-center btn-sm btn flex  items-center justify-center bg-red-500 text-white transition-all hover:bg-red-300"
          >
            <AiFillCloseCircle size={20} />
          </label>
        </div>
        <p className="text-xl font-bold">Wybrany dzień to:</p>
        <p className="mb-8 text-2xl text-blue-500">{`${clickedDay?.getDate()}.${
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
                {errorHours ? (
                  <li>
                    Wystąpił błąd podczas wczytywania godzin - spróbuj ponownie
                  </li>
                ) : (
                  takenHours.map((hour) => {
                    return (
                      <motion.li
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={hour}
                      >
                        {hour}
                      </motion.li>
                    );
                  })
                )}
              </motion.ul>
            </>
          )}
        </AnimatePresence>
        <HoursForm clickedDay={clickedDay} takenHours={takenHours} />
      </label>
    </label>
  );
};

export default Modal;
