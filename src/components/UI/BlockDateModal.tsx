import { useContext, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AlertContext } from '../../contexts/AlertContext';
import { TailSpin } from 'react-loading-icons';
import useGetBlockedDays from '../hooks/useGetBlockedDays';
import addBlockedDate from '../../functions/addBlockedDate';
import removeBlockedDate from '../../functions/removeBlockedDate';

const BlockDateModal: React.FC<{
  clickedDay: string;
}> = ({ clickedDay }) => {
  const { setAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const blockedDays = useGetBlockedDays();

  const blockDate = () => {
    setIsLoading(true);
    try {
      addBlockedDate(clickedDay);
      setAlert('Zablokowano datę!', true, false);
    } catch (error: unknown) {
      setAlert(
        'Błąd podczas blokowania daty, spróbuj ponownie później...',
        true,
        true
      );
    }
    setIsLoading(false);
  };

  const unlockDate = () => {
    setIsLoading(true);
    try {
      removeBlockedDate(clickedDay);
      setAlert('Odblokowano datę!', true, false);
    } catch (error: unknown) {
      setAlert(
        'Błąd podczas odblokowywania daty, spróbuj ponownie później...',
        true,
        true
      );
    }
    setIsLoading(false);
  };

  return (
    <label htmlFor="block-modal" className="modal cursor-pointer">
      <label className="align-center modal-box flex flex-col items-center justify-center">
        <div className="absolute right-2 top-2">
          <label
            htmlFor="block-modal"
            className="align-center btn-sm btn flex  items-center justify-center bg-red-500 text-white transition-all hover:bg-red-300"
          >
            <AiFillCloseCircle size={20} />
          </label>
        </div>
        <p className="text-xl font-bold">Wybrany dzień to:</p>
        <p className="mb-8 text-2xl text-blue-500">{clickedDay}</p>
        <div>
          {blockedDays?.includes(clickedDay) ? (
            <button className="btn-success btn mt-8 w-32" onClick={unlockDate}>
              {isLoading ? <TailSpin /> : 'Odblokuj datę'}
            </button>
          ) : (
            <button className="btn-success btn mt-8 w-32" onClick={blockDate}>
              {isLoading ? <TailSpin /> : 'Zablokuj datę'}
            </button>
          )}
        </div>
      </label>
    </label>
  );
};

export default BlockDateModal;
