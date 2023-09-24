import { useContext, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TailSpin } from 'react-loading-icons';
import { AlertContext } from '../../contexts/AlertContext';
import removeReservation from '../../functions/removeReservation';

const ConfirmDeletionModal: React.FC<{
  day: string;
  hour: string;
  email: string;
}> = ({ day, hour, email }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAlert } = useContext(AlertContext);

  const handleDeletion = async () => {
    setIsLoading(true);
    removeReservation(day, hour, email)
      .then(() => {
        setAlert('Usunięto rezerwację!', true, false);
      })
      .catch(() => {
        setAlert('Błąd podczas usuwania, spróbuj później...', true, false);
      });
    setIsLoading(false);
  };

  return (
    <>
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <label htmlFor="delete-modal" className="modal cursor-pointer">
        <label className="align-center modal-box flex flex-col items-center justify-center">
          <div className="absolute right-2 top-2">
            <label
              htmlFor="delete-modal"
              className="align-center btn-sm btn flex  items-center justify-center bg-red-500 text-white transition-all hover:bg-red-300"
            >
              <AiFillCloseCircle size={20} />
            </label>
          </div>
          <p className="mt-8 text-xl font-bold">Na pewno usunąć rezerwację</p>
          <p className="mb-8 text-xl font-bold">
            {day} godz. {hour}?
          </p>
          <label
            htmlFor="delete-modal"
            onClick={handleDeletion}
            className="align-center btn-sm btn flex h-12  items-center justify-center bg-red-500 text-white transition-all hover:bg-red-300"
          >
            {isLoading ? <TailSpin /> : 'usuń rezerwację'}
          </label>
        </label>
      </label>
    </>
  );
};

export default ConfirmDeletionModal;
