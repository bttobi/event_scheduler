import { createContext, useState } from "react";

export const AlertContext = createContext({
  notificationMessage: "",
  isVisible: false,
  errorHappened: false,
  setAlert: (message: string, visibility: boolean, error: boolean) => {},
});
