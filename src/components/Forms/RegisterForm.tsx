import { useForm } from "react-hook-form";
import RegisterInputs from "../../types/RegisterInputs";
import errorRegisterTypes from "../../data/errorRegisterTypes";
import { AnimatePresence, motion } from "framer-motion";

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInputs>({
    mode: "onChange",
  });

  const login = (data: RegisterInputs) => {
    //@ts-ignore
    errorRegisterTypes.forEach(({ name, type }) => setError(name, { type }));

    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => login(data))}
      className="align-center flex w-min flex-col items-center justify-center gap-2 rounded-lg bg-blue-400 px-10 py-4 pb-0 text-slate-400"
    >
      <div className="align-center relative flex items-center justify-center">
        <label className="absolute">Email</label>
        <input
          {...register("email_register", {
            required: { value: true, message: "Pole jest wymagane" },
          })}
          type="email"
          className="input"
        />
      </div>
      <div className="relative mb-4 h-4">
        <AnimatePresence>
          {errors?.email_register && (
            <motion.p
              className="font-bold text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {errors?.email_register.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="align-center relative flex items-center justify-center">
        <label className="absolute">Hasło</label>
        <input
          {...register("password_register", {
            required: { value: true, message: "Pole jest wymagane" },
          })}
          type="password"
          className="input"
        />
      </div>
      <div className="relative mb-4 h-4">
        <AnimatePresence>
          {errors?.password_register && (
            <motion.p
              className="font-bold text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {errors?.password_register.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="align-center relative flex items-center justify-center">
        <label className="absolute">Potwierdź hasło</label>
        <input
          {...register("password_register_confirm", {
            required: { value: true, message: "Pole jest wymagane" },
          })}
          type="password"
          className="input"
        />
      </div>
      <div className="relative h-4 ">
        <AnimatePresence>
          {errors?.password_register_confirm && (
            <motion.p
              className="font-bold text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {errors?.password_register_confirm.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <button type="submit" className="btn my-4">
        ZAREJESTRUJ
      </button>
    </form>
  );
};

export default RegisterForm;
