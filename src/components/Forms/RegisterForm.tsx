import { useForm } from "react-hook-form";
import RegisterInputs from "../../types/RegisterInputs";
import errorRegisterTypes from "../../data/errorRegisterTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

const RegisterForm: React.FC = () => {
  const labelEmailRegisterRef = useRef<HTMLLabelElement>(null);
  const labelPasswordRegisterRef = useRef<HTMLLabelElement>(null);
  const labelPasswordConfirmRegisterRef = useRef<HTMLLabelElement>(null);

  const {
    register,
    watch,
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
      className="align-center flex w-min flex-col items-center justify-center gap-2 rounded-lg px-10 py-4 pb-0 text-slate-400"
      noValidate
    >
      <div className="align-center relative flex items-center justify-center">
        <label ref={labelEmailRegisterRef} className="label-default absolute">
          Email
        </label>
        <input
          {...register("email_register", {
            required: { value: true, message: "Pole jest wymagane" },
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: "Wprowadź adres email",
            },
            onBlur: (e) => {
              if (e.currentTarget.value == "")
                labelEmailRegisterRef.current?.classList.remove("label-form");
            },
            onChange: () =>
              labelEmailRegisterRef.current?.classList.add("label-form"),
          })}
          type="email"
          className="input"
          onFocus={() =>
            labelEmailRegisterRef.current?.classList.add("label-form")
          }
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
        <label
          ref={labelPasswordRegisterRef}
          className="label-default absolute"
        >
          Hasło
        </label>
        <input
          {...register("password_register", {
            required: { value: true, message: "Pole jest wymagane" },
            pattern: {
              value: /[^A-Za-z0-9]/,
              message: "Wymagany 1 znak specjalny",
            },
            minLength: {
              value: 6,
              message: "Min. 6 znaków w haśle",
            },
            onBlur: (e) => {
              if (e.currentTarget.value == "")
                labelPasswordRegisterRef.current?.classList.remove(
                  "label-form"
                );
            },
            onChange: () =>
              labelPasswordRegisterRef.current?.classList.add("label-form"),
          })}
          type="password"
          className="input"
          onFocus={() =>
            labelPasswordRegisterRef.current?.classList.add("label-form")
          }
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
        <label
          ref={labelPasswordConfirmRegisterRef}
          className="label-default absolute"
        >
          Powtórz hasło
        </label>
        <input
          {...register("password_register_confirm", {
            required: { value: true, message: "Pole jest wymagane" },
            validate: (val: string) => {
              if (watch("password_register") != val) {
                return "Hasła nie są zgodne";
              }
            },
            onBlur: (e) => {
              if (e.currentTarget.value == "")
                labelPasswordConfirmRegisterRef.current?.classList.remove(
                  "label-form"
                );
            },
            onChange: () =>
              labelPasswordConfirmRegisterRef.current?.classList.add(
                "label-form"
              ),
          })}
          type="password"
          className="input"
          onFocus={() =>
            labelPasswordConfirmRegisterRef.current?.classList.add("label-form")
          }
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
