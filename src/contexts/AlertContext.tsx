import { createContext, useState } from 'react';

type AlertContextType = {
  notificationMessage: string;
  isVisible: boolean;
  errorHappened: boolean;
  setAlert: (message: string, visibility: boolean, error: boolean) => undefined;
};

export const AlertContext = createContext<AlertContextType>({
  notificationMessage: '',
  isVisible: false,
  errorHappened: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAlert: () => undefined,
});

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errorHappened, setErrorHappened] = useState<boolean>(false);

  const setAlert = (
    message: string,
    visibility: boolean,
    error: boolean
  ): undefined => {
    setNotificationMessage(message);
    setIsVisible(visibility);
    setErrorHappened(error);

    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return;
  };

  return (
    <AlertContext.Provider
      value={{
        notificationMessage,
        isVisible,
        errorHappened,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
