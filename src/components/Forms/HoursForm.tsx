import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import addDate from '../../functions/addDate';
import FormInputs from '../../types/FormInputs';
import errorTypes from '../../data/errorHourTypes';
import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';
import useGetTakenHours from '../hooks/useGetTakenHours';
import useGetLast30Days from '../hooks/useGetLast30Days';

const HoursForm: React.FC<{
  clickedDay: string;
}> = ({ clickedDay }) => {
  const [isPostingToDb, setIsPostingToDb] = useState<boolean>(false);
  const [user, setUser] = useState<string | undefined>('');
  const takenHours = useGetTakenHours(clickedDay);
  const last30Days = useGetLast30Days(user as string);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      hour: '08:00',
    },
    mode: 'onChange',
  });

  const auth = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  const postToDb = async (data: FormInputs) => {
    setIsPostingToDb(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    errorTypes.forEach(({ name, type }) => setError(name, { type }));

    if (Object.keys(errors).length != 0) {
      setIsPostingToDb(false);
      return;
    }

    try {
      addDate(clickedDay, data.hour, user);
      setAlert('Dodano rezerwację!', true, false);
    } catch (error: unknown) {
      setAlert(
        'Błąd podczas dodawania rezerwacji - spróbuj ponownie...',
        true,
        true
      );
    }
    setIsPostingToDb(false);
  };

  useEffect(() => {
    reset();
  }, [clickedDay, reset]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUser(user?.email as string);
      else setUser('');
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <form
      className="align-center flex flex-col items-center justify-center bg-inherit"
      onSubmit={handleSubmit(data => postToDb(data))}
      noValidate
    >
      <label htmlFor="hour">Wybierz godzinę:</label>
      <input
        type="time"
        className="input-bordered input w-48 max-w-xs bg-slate-700 text-center"
        step="1800"
        {...register('hour', {
          required: { value: true, message: 'To pole jest wymagane' },
          min: {
            value: '08:00',
            message: 'Podaj godzinę z przedziału 8:00-22:00',
          },
          max: {
            value: '22:30',
            message: 'Podaj godzinę z przedziału 8:00-22:00',
          },
          validate: {
            isTaken: (val: string) =>
              !takenHours?.includes(val) || 'Godzina zajęta!',
            isCorrectStep: (val: string) =>
              val.slice(3) === '00' ||
              val.slice(3) === '30' ||
              'Dozwolone tylko 30 minutowe przedziały!',
            hasAlreadyBooked: () =>
              !last30Days?.find(el => el.day === clickedDay)?.hour ||
              'Rezerwowałeś juz w tym dniu!',
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
        {isPostingToDb ? <TailSpin /> : 'Zatwierdź wizytę'}
      </button>
    </form>
  );
};

export default HoursForm;
