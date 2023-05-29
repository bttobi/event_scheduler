import { useForm } from "react-hook-form";
import LoginInputs from "../../types/LoginInputs";
import errorLoginTypes from "../../data/errorLoginTypes";

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
        {...register("email", {
          required: { value: true, message: "Pole jest wymagane" },
        })}
        type="email"
        className="input"
      />
      <label>Hasło:</label>
      <input
        {...register("password_login", {
          required: { value: true, message: "Pole jest wymagane" },
        })}
        type="password"
        className="input"
      />
    </form>
  );
};

export default LoginForm;
