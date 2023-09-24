import db from '../firebase';
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { ReservationEntry } from './addDate';

const removeReservation = async (
  date: string,
  hour: string,
  email: string | undefined | null
) => {
  if (email == null) return;

  if (!date) return true;

  const collectionDaysRef = await collection(db, 'list_of_days');
  const documentDayRef = await doc(collectionDaysRef, date);
  const entryToRemove: ReservationEntry = {
    day: date,
    email,
    hasPaid: false,
    hour,
  };
  let docSnap = await getDoc(documentDayRef);
  if (docSnap.exists()) {
    await updateDoc(documentDayRef, { data: arrayRemove(entryToRemove) });
    docSnap = await getDoc(documentDayRef);
    if (docSnap.exists() && docSnap.data().data.length === 0) {
      await deleteDoc(documentDayRef);
    }
  }
};

export default removeReservation;
