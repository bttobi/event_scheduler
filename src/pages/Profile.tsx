import { AnimatePresence, motion } from 'framer-motion';
import ChangeEmailModal from '../components/UI/ChangeEmailModal';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { AlertContext } from '../contexts/AlertContext';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

const Profile = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  const sendResetEmail = async () => {
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setAlert('Wysłano email z resetem hasła!', true, false);
      })
      .catch(() => {
        setAlert('Wystąpił błąd spróbuj ponownie później...', true, true);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setEmail(user?.email || '');
      else setEmail('null');
    });

    return () => unsubscribe();
  }, [auth, auth.currentUser?.email]);

  return email !== 'admin@admin.admin' && email !== 'test@gmail.com' ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center mt-24 flex h-full w-full flex-col items-center justify-center"
      >
        <div
          className="align-center mt-8 flex max-h-96 w-64 flex-col items-center justify-center overflow-y-scroll rounded-lg px-8 py-4"
          style={{ background: 'rgb(3, 105, 161)' }}
        >
          <p className="mb-4 text-center text-xl text-white">{email}</p>
          <button
            onClick={sendResetEmail}
            className="align-center btn-sm btn flex items-center justify-center rounded-lg  border-none bg-red-500 px-4 text-white transition-all hover:bg-red-300"
          >
            {isLoading ? <TailSpin /> : 'zmień hasło'}
          </button>
          <label
            htmlFor="change-email-modal"
            className="align-center btn-sm btn mt-4 flex items-center justify-center  rounded-lg border-none bg-red-500 px-4 text-white transition-all hover:bg-red-300"
          >
            zmień email
          </label>
          <ChangeEmailModal />
        </div>
      </motion.div>
    </AnimatePresence>
  ) : (
    <div className="mt-24">NIE MASZ DOSTĘPU</div>
  );
};

export default Profile;
