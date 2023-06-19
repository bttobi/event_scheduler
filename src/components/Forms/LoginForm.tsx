import { useForm } from "react-hook-form";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginInputs from "../../types/LoginInputs";
import errorLoginTypes from "../../data/errorLoginTypes";
import Button from "../UI/Button";
import resolveError from "../../functions/resolveError";
import { AlertContext } from "../../contexts/AlertContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const labelEmailLoginRef = useRef<HTMLLabelElement>(null);
  const labelPasswordLoginRef = useRef<HTMLLabelElement>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>({
    mode: "onChange",
  });

  const { setAlert } = useContext(AlertContext);

  const loginUser = async (data: LoginInputs) => {
    //@ts-ignore
    errorLoginTypes.forEach(({ name, type }) => setError(name, { type }));
    const auth = getAuth();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        data.email_login,
        data.password_login
      );
      setAlert("Zalogowano pomyślnie!", true, false);
    } catch (error: any) {
      setAlert(
        resolveError(error.code) ?? "Wystąpił błąd - spróbuj ponownie później",
        true,
        true
      );
    }

    reset(); // reset the form
    setIsLoading(false);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit((data) => loginUser(data))}
      className="align-center flex w-min flex-col items-center justify-center gap-2 rounded-lg px-10 py-4 pb-0 text-slate-400"
      noValidate
    >
      <div className="align-center relative flex items-center justify-center">
        <label ref={labelEmailLoginRef} className="label-default absolute">
          Email
        </label>
        <input
          {...register("email_login", {
            required: { value: true, message: "Pole jest wymagane" },
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: "Wprowadź adres email",
            },
            onBlur: (e) => {
              if (e.currentTarget.value == "")
                labelEmailLoginRef.current?.classList.remove("label-form");
            },
            onChange: () =>
              labelEmailLoginRef.current?.classList.add("label-form"),
          })}
          type="email"
          className="input"
          onFocus={() =>
            labelEmailLoginRef.current?.classList.add("label-form")
          }
        />
      </div>
      <div className="relative mb-4 h-4">
        <AnimatePresence>
          {errors?.email_login && (
            <motion.p
              className="font-bold text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {errors?.email_login.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="align-center relative flex items-center justify-center">
        <label ref={labelPasswordLoginRef} className="label-default absolute">
          Hasło
        </label>
        <input
          {...register("password_login", {
            required: { value: true, message: "Pole jest wymagane" },
            onBlur: (e) => {
              if (e.currentTarget.value == "")
                labelPasswordLoginRef.current?.classList.remove("label-form");
            },
            onChange: () =>
              labelPasswordLoginRef.current?.classList.add("label-form"),
          })}
          type={togglePassword ? "text" : "password"}
          className="input"
          onFocus={() =>
            labelPasswordLoginRef.current?.classList.add("label-form")
          }
        />
        <label className="swap absolute right-3">
          <input
            type="checkbox"
            onChange={() => {
              setTogglePassword(!togglePassword);
            }}
          />
          <AiFillEye className="swap-on" />
          <AiFillEyeInvisible className="swap-off" />
        </label>
      </div>
      <div className="relative h-4">
        <AnimatePresence>
          {errors?.password_login && (
            <motion.p
              className="font-bold text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {errors?.password_login.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <Button text="Zaloguj" isLoading={isLoading} />
    </form>
  );
};

export default LoginForm;
