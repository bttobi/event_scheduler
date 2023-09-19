import { createContext } from "react";
import { auth } from "../firebase";

export const UserContext = createContext(auth);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};
