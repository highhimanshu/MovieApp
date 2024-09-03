export const validation = (email: string, password: string) => {
  const error: any = {};

  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);

  const regexPassword = /^[A-Za-z]\w{7,14}$/;
  const isPasswordValid = regexPassword.test(password);

  if (!isEmailValid) {
    error.email = "Email is not valid";
  }
  if (!isPasswordValid) {
    error.password = "Password is not valid";
  }

  return error;
};
