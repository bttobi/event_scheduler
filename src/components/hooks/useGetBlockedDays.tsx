import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import firebase from '../../firebase';

const useGetBlockedDays = () => {
  const [blockedDays, setBlockedDays] = useState<string[]>();

  useEffect(() => {
    const q = query(collection(firebase, 'blocked_days'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const fetchedDays: string[] = [];
      querySnapshot.forEach(doc => {
        fetchedDays.push(doc.id);
      });

      setBlockedDays(fetchedDays);
    });

    return () => unsubscribe();
  }, []);

  return blockedDays;
};

export default useGetBlockedDays;
