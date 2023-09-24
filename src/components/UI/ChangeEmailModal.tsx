import { useContext, useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TailSpin } from 'react-loading-icons';
import { ErrorFn, getAuth, updateEmail } from 'firebase/auth';
import { AlertContext } from '../../contexts/AlertContext';
import { useForm } from 'react-hook-form';
import errorPassResetTypes from '../../data/errorPassResetTypes';
import { AnimatePresence, motion } from 'framer-motion';
import ForgotPassInputs from '../../types/ForgotPassInputs';

const ChangeEmailModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const labelEmailRef = useRef<HTMLLabelElement>(null);
  const auth = getAuth();
  const { setAlert } = useContext(AlertContext);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ForgotPassInputs>({
    mode: 'onChange',
  });

  const changeEmail = async (data: ForgotPassInputs) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    errorPassResetTypes.forEach(({ name, type }) => setError(name, { type }));
    setIsLoading(true);
    auth.currentUser &&
      updateEmail(auth.currentUser, data.email)
        .then(() => {
          setAlert('Zmieniono email!', true, false);
        })
        .catch(error => {
          if (error?.code === 'auth/requires-recent-login')
            setAlert(
              'Wyloguj i zaloguj się ponownie, aby zmienić hasło!',
              true,
              true
            );
          else
            setAlert('Wystąpił błąd spróbuj ponownie później...', true, true);
        });
    setIsLoading(false);
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(data => changeEmail(data))}
        className="align-center flex w-min flex-col items-center justify-center gap-2 rounded-lg px-10 py-4 pb-0 text-slate-400"
        style={{ background: 'none' }}
        noValidate
      >
        <input
          type="checkbox"
          id="change-email-modal"
          className="modal-toggle"
        />
        <label htmlFor="change-email-modal" className="modal cursor-pointer">
          <label className="align-center modal-box flex flex-col items-center justify-center">
            <div className="absolute right-2 top-2">
              <label
                htmlFor="change-email-modal"
                className="align-center btn-sm btn flex  items-center justify-center bg-red-500 text-white transition-all hover:bg-red-300"
              >
                <AiFillCloseCircle size={20} />
              </label>
            </div>
            <div className="align-center relative flex items-center justify-center">
              <label
                ref={labelEmailRef}
                className="label-default absolute"
                style={{ backgroundColor: '#0369a1', color: '#fff' }}
              >
                Email
              </label>
              <input
                {...register('email', {
                  required: { value: true, message: 'Pole jest wymagane' },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: 'Wprowadź adres email',
                  },
                  onBlur: e => {
                    if (e.currentTarget.value === '') {
                      labelEmailRef.current?.classList.remove('label-form');
                    }
                  },
                  onChange: () =>
                    labelEmailRef.current?.classList.add('label-form'),
                })}
                type="email"
                className="input"
                style={{ backgroundColor: '#0369a1', color: '#fff' }}
                onFocus={() =>
                  labelEmailRef.current?.classList.add('label-form')
                }
              />
            </div>
            <div className="relative mb-8 h-2">
              <AnimatePresence>
                {errors?.email && (
                  <motion.p
                    className="font-bold text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors?.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <button type="submit" className="btn-success btn mt-4 h-6">
              {isLoading ? <TailSpin /> : 'Zmień email'}
            </button>
          </label>
        </label>
      </form>
    </>
  );
};

export default ChangeEmailModal;
