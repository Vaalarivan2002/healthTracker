// error middleware
export const createError = (message, status) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
}