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
    if(error.isOperational){
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

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "error";

    if(process.env.NODE_ENV === "dev"){
        devErrors(res, error);
    }else if (process.env.NODE_ENV === "prod"){
        prodErrors(res, error);
    }
};