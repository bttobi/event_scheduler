import { useState } from "react";
import { AlertContext } from "./AlertContext";

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errorHappened, setErrorHappened] = useState<boolean>(false);

  const setAlert = (message: string, visibility: boolean, error: boolean) => {
    setNotificationMessage(message);
    setIsVisible(visibility);
    setErrorHappened(error);

    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
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
