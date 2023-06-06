import { TailSpin } from "react-loading-icons";

const Button: React.FC<{ text: string; isLoading: boolean }> = ({
  text,
  isLoading,
}) => {
  return (
    <button type="submit" className="btn my-4 w-32">
      {isLoading ? <TailSpin /> : text}
    </button>
  );
};

export default Button;
