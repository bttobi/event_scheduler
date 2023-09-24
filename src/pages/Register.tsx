import { NavLink } from 'react-router-dom';
import RegisterForm from '../components/Forms/RegisterForm';
import { AnimatePresence, motion } from 'framer-motion';

const Register = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center mt-36 flex flex-col items-center justify-center"
      >
        <RegisterForm />
        <div className="align-center mt-16 flex flex-col items-center justify-center">
          <p>Masz już konto?</p>
          <NavLink to="/zaloguj" className="underline">
            Zaloguj się tutaj
          </NavLink>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Register;
