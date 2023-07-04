import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const ForgotPassModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <label htmlFor="my-modal-7" className="modal cursor-pointer">
      <label className="align-center modal-box flex flex-col items-center justify-center">
        <div className="absolute right-2 top-2">
          <label
            htmlFor="my-modal-7"
            className="align-center btn-sm btn flex  items-center justify-center bg-red-500 text-white transition-all hover:bg-red-300"
          >
            <AiFillCloseCircle size={20} />
          </label>
        </div>
        <p className="text-xl font-bold">Na pewno zresetować hasło?</p>
        <button className="btn-success btn h-12">Wyślij email z resetem</button>
      </label>
    </label>
  );
};

export default ForgotPassModal;
