import { NavLink } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";

const Login = () => {
  return (
    <div className="align-center mt-16 flex flex-col items-center justify-center">
      <LoginForm />
      <div className="align-center mt-16 flex flex-col items-center justify-center">
        <p>Nie masz jeszcze konta?</p>
        <NavLink to="/zarejestruj" className="underline">
          Zarejestruj się tutaj
        </NavLink>
        <p className="mt-8">Zapomniałeś hasła?</p>
        <button className="underline">Kliknij tutaj</button>
      </div>
    </div>
  );
};

export default Login;
