import { NavLink } from "react-router-dom";
import RegisterForm from "../components/Forms/RegisterForm";

const Register = () => {
  return (
    <div className="align-center mt-16 flex flex-col items-center justify-center">
      <RegisterForm />
      <div className="align-center mt-16 flex flex-col items-center justify-center">
        <p>Masz już konto?</p>
        <NavLink to="/zaloguj" className="underline">
          Zaloguj się tutaj
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
