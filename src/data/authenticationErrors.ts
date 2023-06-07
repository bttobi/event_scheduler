import authErrors from "../types/AuthErrors";

const authErrorCodes: authErrors[] = [
  {
    value: "auth/email-already-exists",
    name: "Użytkownik o takim adresie email już istnieje",
  },
  {
    value: "auth/invalid-password",
    name: "Nieprawidłowe hasło",
  },
  {
    value: "auth/user-not-found",
    name: "Nie znaleziono użytkownika",
  },
];

export default authErrorCodes;
