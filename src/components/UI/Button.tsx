import { TailSpin } from "react-loading-icons";

const Button: React.FC<{ text: string; isLoading: boolean }> = ({
  text,
  isLoading,
}) => {
  return (
    <button
      type="submit"
      className="font-text bg-primary_button btn my-4 w-32 border-none outline-none "
    >
      {isLoading ? <TailSpin /> : text}
    </button>
  );
};

export default Button;
