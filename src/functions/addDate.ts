import db from "../firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const addDate = async (
  date: Date | undefined,
  hour: string,
  email: string | undefined | null
) => {
  console.log(email);
  if (email == null) return;

  if (!date) return true;
  let errorHappened: boolean = false;
  const stringDate = `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`;
  const collectionRef = await collection(db, stringDate);
  const documentRef = await doc(collectionRef, hour);
  const documentSnap = await getDoc(documentRef);

  if (documentSnap.exists()) {
    errorHappened = true;
    return errorHappened;
  }

  await setDoc(documentRef, { hour: hour, email: email, hasPaid: false });

  //setting a day to collection of days
  const collectionDaysRef = await collection(db, "list_of_days");
  const documentDayRef = await doc(collectionDaysRef, stringDate);
  await setDoc(documentDayRef, { day: stringDate });

  const collectionUserDaysRef = await collection(db, email);
  const documentUserRef = await doc(collectionUserDaysRef, stringDate);
  await setDoc(documentUserRef, { day: stringDate, hour: hour });
};

export default addDate;
