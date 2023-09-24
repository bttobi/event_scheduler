import db from '../firebase';
import { collection, deleteDoc, doc, getDoc } from 'firebase/firestore';

const removeBlockedDate = async (date: string) => {
  if (!date) return true;

  const collectionDaysRef = await collection(db, 'blocked_days');
  const documentDayRef = await doc(collectionDaysRef, date);
  const docSnap = await getDoc(documentDayRef);
  if (docSnap.exists()) {
    await deleteDoc(documentDayRef);
  }
};

export default removeBlockedDate;
