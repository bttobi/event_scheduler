import db from '../firebase';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

export type ReservationEntry = {
  day: string;
  email: string;
  hasPaid: boolean;
  hour: string;
};

const addDate = async (
  date: string,
  hour: string,
  email: string | undefined | null
) => {
  if (email == null) return;

  if (!date) return true;

  const collectionDaysRef = await collection(db, 'list_of_days');
  const documentDayRef = await doc(collectionDaysRef, date);
  const newEntry: ReservationEntry = {
    day: date,
    email,
    hasPaid: false,
    hour,
  };
  const docSnap = await getDoc(documentDayRef);
  if (docSnap.exists()) {
    await updateDoc(documentDayRef, { data: arrayUnion(newEntry) });
    return;
  }
  await setDoc(documentDayRef, { data: [newEntry] });
};

export default addDate;
