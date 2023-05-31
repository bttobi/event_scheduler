import { useForm } from "react-hook-form";
import LoginInputs from "../../types/LoginInputs";
import errorLoginTypes from "../../data/errorLoginTypes";
import { AnimatePresence, motion } from "framer-motion";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>({
    mode: "onChange",
  });

  const login = (data: LoginInputs) => {
    //@ts-ignore
    errorLoginTypes.forEach(({ name, type }) => setError(name, { type }));

    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => login(data))}
      className="align-center flex w-min flex-col items-center justify-center rounded-lg bg-blue-400"
    >
      <label>Email:</label>
      <input
        {...register("email_login", {
          required: { value: true, message: "Pole jest wymagane" },
        })}
        type="email"
        className="input"
      />
      <div className="relative h-4">
        <AnimatePresence>
          {errors?.email_login && (
            <motion.p
              className="text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {errors?.email_login.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <label>Hasło:</label>
      <input
        {...register("password_login", {
          required: { value: true, message: "Pole jest wymagane" },
        })}
        type="password"
        className="input"
      />
      <div className="relative h-4">
        <AnimatePresence>
          {errors?.password_login && (
            <motion.p
              className="text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {errors?.password_login.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <button type="submit" className="btn my-4">
        ZALOGUJ
      </button>
    </form>
  );
};

export default LoginForm;
