import {
  DocumentData,
  collection,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import firebase from '../../firebase';

const useGetTakenDays = () => {
  const [takenDays, setTakenDays] = useState<DocumentData[]>();

  useEffect(() => {
    const q = query(collection(firebase, 'list_of_days'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const fetchedDays: DocumentData[] = [];
      querySnapshot.forEach(doc => {
        fetchedDays.push(doc.data());
      });

      setTakenDays(fetchedDays);
    });

    return () => unsubscribe();
  }, []);

  return takenDays;
};

export default useGetTakenDays;
