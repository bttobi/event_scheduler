import { ReservationEntry } from '../../functions/addDate';
import useGetTakenDays from './useGetTakenDays';

const useGetTakenHours = (clickedDay: string) => {
  const takenDays = useGetTakenDays();

  return takenDays
    ?.map(el =>
      el.data.filter((obj: ReservationEntry) => obj.day === clickedDay)
    )
    .filter(el => el.length > 0)[0]
    ?.map((el: ReservationEntry) => el.hour)
    .sort();
};

export default useGetTakenHours;
