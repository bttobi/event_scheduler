import { useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import addDate from "../functions/addDate";
import Alert from "./Alert";

const Modal: React.FC<{ clickedDay: Date | undefined }> = ({ clickedDay }) => {
  const inputHourRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  return (
    <label htmlFor="my-modal-6" className="modal cursor-pointer">
      <label className="modal-box relative flex flex-col justify-center align-center items-center ">
        <div className="right-2 absolute top-2">
          <label
            htmlFor="my-modal-6"
            className="btn btn-sm bg-red-500 transition-all  hover:bg-red-300 text-white flex justify-center align-center items-center"
          >
            <AiFillCloseCircle size={20} />
          </label>
        </div>
        <p className="font-bold text-xl">Wybrany dzień to:</p>
        <p className="text-2xl mb-8 text-blue-500">{`${clickedDay?.getDate()}.${
          clickedDay && clickedDay?.getMonth() + 1
        }.${clickedDay?.getFullYear()}`}</p>
        <p className="text-red-400 text-xl font-bold">Zajęte godziny to:</p>
        <ul className="mb-8 max-w-32 overflow-y-auto flex gap-2 flex-wrap justify-center items-center align-center">
          <li>17:00 </li>
          <li>18:00 </li>
          <li>18:00 </li>
          <li>18:00 </li>
          <li>18:00 </li>
          <li>18:00 </li>
          <li>17:00 </li>
          <li>18:00 </li>
        </ul>
        <label htmlFor="hour">Wybierz godzinę:</label>
        <input
          name="hour"
          type="time"
          className="input input-bordered w-48 max-w-xs bg-slate-700"
          step="1800"
          ref={inputHourRef}
          required
        />
        <label htmlFor="email" className="mt-8">
          Podaj adres email:
        </label>
        <input
          name="email"
          type="email"
          className="input input-bordered w-48 max-w-xs bg-slate-700"
          ref={inputEmailRef}
          required
        />
        <button
          className="btn btn-success mt-8"
          onClick={() => {
            if (inputHourRef.current && inputEmailRef.current)
              addDate(
                clickedDay,
                inputHourRef.current.value,
                inputEmailRef.current.value
              );
          }}
        >
          Zatwierdź wizytę
        </button>
      </label>
      <Alert errorHappened={true} notificationMessage="test" />
    </label>
  );
};

export default Modal;
