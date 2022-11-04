export const validateEmail = (email) => {
let regex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
};
export const validatePassword = (password) => {
    if (password.length < 8) return false;
    return true;
};

export const confirmPassword = (password, givenPassword) => {
    if (password !== givenPassword) return false;
    return true;
};
  