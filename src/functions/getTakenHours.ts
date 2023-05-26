import db from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const getTakenHours = async (
  stringDate: Date | undefined
): Promise<string[]> => {
  const dateToCheck: string = `${stringDate?.getDate()}.${
    stringDate && stringDate?.getMonth() + 1
  }.${stringDate?.getFullYear()}`;

  const documents: string[] = [];
  const collectionRef = await collection(db, dateToCheck);
  const docsSnap = await getDocs(collectionRef);
  docsSnap.forEach((doc) => {
    console.log(doc.data);
    documents.push(doc.data().hour);
  });
  return documents.sort();
};

export default getTakenHours;
