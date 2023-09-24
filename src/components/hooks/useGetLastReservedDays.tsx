import useGetTakenDays from './useGetTakenDays';
import { ReservationEntry } from '../../functions/addDate';

type BookedDate = {
  day: string;
  hour: string;
};

const useGetLastReservedDays = (userEmail: string) => {
  const takenDays = useGetTakenDays();

  return takenDays
    ?.map(el =>
      el.data.filter((obj: ReservationEntry) => obj.email === userEmail)
    )
    .filter(el => el.length > 0)
    .map(el => {
      return { day: el[0]?.day, hour: el[0]?.hour } as BookedDate;
    });
};

export default useGetLastReservedDays;
