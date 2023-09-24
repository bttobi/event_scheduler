import { NavLink, useNavigate } from 'react-router-dom';
import LoginForm from '../components/Forms/LoginForm';
import { AnimatePresence, motion } from 'framer-motion';
import ForgotPassModal from '../components/UI/ForgotPassModal';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { AlertContext } from '../contexts/AlertContext';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const loginTest = async () => {
    const auth = getAuth();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        'test@gmail.com',
        'test@gmail.com'
      );
      setAlert('Zalogowano na konto testowe!', true, false);
    } catch (error: unknown) {
      setAlert('Wystąpił błąd, spróbuj ponownie później...', true, true);
    }
    setIsLoading(false);
    navigate('/');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center mt-24 flex flex-col items-center justify-center"
      >
        <LoginForm />
        <div className="align-center mt-16 flex flex-col items-center justify-center">
          <p>Nie masz jeszcze konta?</p>
          <NavLink to="/zarejestruj" className="underline">
            Zarejestruj się tutaj
          </NavLink>
          <p className="mt-8">Zapomniałeś hasła?</p>
          <label
            htmlFor="forgotpass-modal"
            className="cursor-pointer underline"
          >
            Kliknij tutaj
          </label>
          <ForgotPassModal />
          <button className="btn" onClick={loginTest}>
            {isLoading ? <TailSpin /> : 'konto testowe'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
