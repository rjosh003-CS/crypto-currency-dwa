const CustomError = require("../../utils/CustomError");

const devErrors = (res, error) => {
        res.status(error.statusCode).json({
            error:{
                status: error.statusCode,
                message: error.message,
                stackTrace: error.stack,
                error: error
            }
        });
} ;

const prodErrors = (res, error ) => {
    if(error?.isOperational){
        res.status(error.statusCode).json({
            error:{
                status: error.statusCode,
                message: error.message
            }
        });} else {
            res.status(500).json({
                status: "error",
                message: "Something went wrong! Please try again later."
            });
        }
};

const castErrorHandler = (err ) => {
    const msg = `Invalid value ${err.path}: ${err.value}`;
    return new CustomError(msg, 400);
};

const duplicateKeyErrorHandler = (err) => {
    const name = err.keyValue.name;
    const msg = `Duplicate key: ${name} . Please use another value!`;
    return new CustomError(msg, 400);
};

// const validationErrorHandler = (err) => {
//     const errors = Object.values(err.errors).map((el) => el.message);
//     const msg = `Invalid input data: ${errors.join(". ")}`;
//     return new CustomError(msg, 400);
// };

const validationErrorHandler = (err) => {
    if (err.errors) {
      const errors = Object.values(err.errors).map((el) => ({
        status: "ValidationError",
        message: el.message,
      }));
      const msg = `Invalid input data: ${errors.map((error) => error.message).join(". ")}`;
      return new CustomError(msg, 400);
    } else {
      // Handle the error object in a way suitable for your application
      return new CustomError("Validation Error", 400);
    }
};  

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "error";

    if(process.env.NODE_ENV === "dev"){
        devErrors(res, error);
    }else if (process.env.NODE_ENV === "prod"){
        if (error.name === "CastError") error = castErrorHandler(error);
        if (error.code === 11000) error = duplicateKeyErrorHandler(error);
        if (error.name === "ValidationError") error = validationErrorHandler(error);
        prodErrors(res, error);
    }
};