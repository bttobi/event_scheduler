import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";
import addDate from "../../functions/addDate";
import Alert from "../Alert";
import FormInputs from "../../types/FormInputs";
import errorTypes from "../../data/errorHourTypes";

const HoursForm: React.FC<{
  clickedDay: Date | undefined;
  takenHours: string[];
}> = ({ clickedDay, takenHours }) => {
  const [isPostingToDb, setIsPostingToDb] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [errorHappened, setErrorHappened] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      hour: "00:00",
    },
    mode: "onChange",
  });

  const postToDb = async (data: FormInputs) => {
    setIsPostingToDb(true);

    //@ts-ignore
    errorTypes.forEach(({ name, type }) => setError(name, { type }));

    if (Object.keys(errors).length != 0) {
      setIsPostingToDb(false);
      return;
    }

    try {
      addDate(clickedDay, data.hour, "test@email.com");
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
  };

  return (
    <>
      <form
        className="align-center flex flex-col items-center justify-center bg-inherit"
        onSubmit={handleSubmit((data) => postToDb(data))}
        noValidate
      >
        <label htmlFor="hour">Wybierz godzinę:</label>
        <input
          type="time"
          className="input-bordered input w-48 max-w-xs bg-slate-700"
          step="1800"
          {...register("hour", {
            required: { value: true, message: "To pole jest wymagane" },
            min: {
              value: "08:00",
              message: "Podaj godzinę z przedziału 8:00-22:00",
            },
            max: {
              value: "22:30",
              message: "Podaj godzinę z przedziału 8:00-22:00",
            },
            validate: {
              isTaken: (val: any) =>
                !takenHours.includes(val) || "Godzina zajęta!",
              isCorrectStep: (val: any) =>
                val.slice(3) == "00" ||
                val.slice(3) == "30" ||
                "Dozwolone tylko 30 minutowe przedziały!",
            },
          })}
        />
        <div className="relative h-4">
          <AnimatePresence>
            {errors?.hour && (
              <motion.p
                className="text-red-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {errors?.hour.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <button className="btn-success btn mt-8 w-32" type="submit">
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
      </form>
      <AnimatePresence>
        {showNotification && (
          <Alert
            errorHappened={errorHappened}
            notificationMessage={notificationMessage}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HoursForm;
