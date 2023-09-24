import db from '../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

const addBlockedDate = async (date: string) => {
  if (!date) return true;

  const collectionDaysRef = await collection(db, 'blocked_days');
  const documentDayRef = await doc(collectionDaysRef, date);
  const docSnap = await getDoc(documentDayRef);
  if (docSnap.exists()) {
    return;
  }
  await setDoc(documentDayRef, { day: date });
};

export default addBlockedDate;
