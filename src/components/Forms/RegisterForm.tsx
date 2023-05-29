import { useForm } from "react-hook-form";
import RegisterInputs from "../../types/RegisterInputs";
import errorRegisterTypes from "../../data/errorRegisterTypes";

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
      className="align-center flex w-min flex-col items-center justify-center rounded-lg bg-blue-400"
    >
      <label>Email:</label>
      <input
        {...register("email", {
          required: { value: true, message: "Pole jest wymagane" },
        })}
        type="email"
        className="input"
      />
      <label>Hasło:</label>
      <input
        {...register("password_register", {
          required: { value: true, message: "Pole jest wymagane" },
        })}
        type="password"
        className="input"
      />
      <label>Potwierdź hasło:</label>
      <input
        {...register("password_register_confirm", {
          required: { value: true, message: "Pole jest wymagane" },
        })}
        type="password"
        className="input"
      />
    </form>
  );
};

export default RegisterForm;
