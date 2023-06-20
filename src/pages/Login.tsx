import { NavLink } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {
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
          <button className="underline">Kliknij tutaj</button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
