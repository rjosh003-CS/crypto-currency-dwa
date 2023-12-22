const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const sendEmail = require("../utils/email");
const User = require("../mvc/models/userSchema");

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(process.env.BASE_URL);
};

exports.isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect(process.env.BASE_URL);
};

exports.restrict = (... role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {

      return res.redirect(process.env.BASE_URL+ "/page403");

      // return next(
      //   new CustomError(
      //     `You do not have permission to perform this action`,
      //     403
      //   )
      // );
    }
    next();
  };
};

exports.forgotPassword = asyncErrorHandler( async(req, res, next) => {
  // 1. GET USER BASED ON POSTED EMAIL
  const user = User.findOne({email : req.body.email});
  
  if (!user){
    return next(new CustomError("There is no user with given email address.", 404));
  }
  
  // 2. GENERATE THE RANDOM RESET TOKEN
  const resetToken = user.createPasswordResetToken();

  await user.save({validateBeforeSave: false});

  // 3. SEND IT TO USER'S EMAIL
  const resetUrl = `${req.protocol}://${req.get('host')})/api/v1/users/resetPassword/${resetToken}`;
  const message = `We have received a password reset request. Please use the bellow link to reset your password \n\n ${resetUrl} \n\n This reset Password link will only be valid for 10 minutes.`;

  try{
    await sendEmail({
        email: user.email,
        subject: "Password reset token (valid for 10 minutes)",
        message: message
      });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!"
    });
  }catch(err){
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save({validateBeforeSave: false});
    return next(new CustomError("There was an error sending password reset email. Please try again later.", 500));
  }
});

exports.passwordReset = asyncErrorHandler( async (req, res, next) => {
  const token = crypto.createHash('sha256').update(req.params.token).digest("hex");
  const user = await User.findOne({passwordResetToken: req.params.token, passwordResetExpires: {$gt: Date.now()}});

  // check for user
  if (!user){
    return next(new CustomError("Token is invalid or has expired", 400));
  }

  user.password = await encrypt(req.body.password);
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();
  res.redirect(process.env.BASE_URL + '/api/login');
});
