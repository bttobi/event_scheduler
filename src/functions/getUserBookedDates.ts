import db from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const getUserBookedDates = async (): Promise<string[]> => {
  const documents: string[] = [];
  const collectionRef = await collection(db, "list_of_days");
  const docsSnap = await getDocs(collectionRef);

  if (docsSnap) {
    docsSnap.forEach((doc) => {
      documents.push(doc.id);
    });
  }

  return documents.sort();
};

export default getUserBookedDates;
