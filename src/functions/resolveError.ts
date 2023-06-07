import authErrorCodes from "../data/authenticationErrors";

const resolveError = (errorCode: string) => {
  return authErrorCodes.find((element) => element.value == errorCode)?.name;
};

export default resolveError;
