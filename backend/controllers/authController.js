const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const sendToken = require("../utils/jwtToken");

//  Register new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const checkUser = await User.findOne({ email });
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Email & Password!",
    });
  }
  if (checkUser) {
    return res.status(401).json({
      success: false,
      message: "Email already used !",
    });
  } else {
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "1197309358",
        url: "https://res.cloudinary.com/www-draggital-com/image/upload/v1637315871/high-fashion-model-metallic-silver-260nw-1197309358_pkrj9h.webp",
      },
    });
    sendToken(user, 201, res);
  }
});

// login user

exports.loginUser = catchAsyncErrors(async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      success: false,
      message: "Please Enter Email & Password!",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return response.status(401).json({
      success: false,
      message: "Invalid Email & Password!",
    });
  }

  const isPasswordMacted = await user.comparePassword(password);

  if (!isPasswordMacted) {
    return response.status(401).json({
      success: false,
      message: "Invalid Email & Password!",
    });
  }

  sendToken(user, 201, response);
});

//  Log Out User
exports.logoutUser = catchAsyncErrors(async (request, response, next) => {
  response.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  response.status(200).json({
    success: true,
    message: "Logout successfully !",
  });
});
