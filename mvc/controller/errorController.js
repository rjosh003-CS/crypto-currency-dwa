module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "error";

    res.status(error.statusCode).json({
        error:{
            status: error.statusCode,
            message: error.message
        }
    });
};