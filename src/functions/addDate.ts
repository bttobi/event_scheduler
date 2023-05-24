import db from "../firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const addDate = async (date: Date | undefined, hour: string, email: string) => {
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
};

export default addDate;
