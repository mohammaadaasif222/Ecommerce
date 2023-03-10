const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const sendToken = require("../utils/jwtToken");
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2

//  Register new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const { name, email, password } = req.body;
 
  try {
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "xvhsgxm27fo2d3j",
        url:"https://res.cloudinary.com/sabah-siddiqui/image/upload/v1590587241/xvhsgxm27fo2d3j.jpg",
      },
    });
    sendToken(user, 201, res);
    
  } catch (error) {
     res.status(401).json({
      success:false,
      error
     })
  }
 


});

// login user

exports.loginUser = catchAsyncErrors(async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      success:false,
      message:'Please enter Email & Password !'
    })
    //  next(new ErrorHandler('Please enter Email & Password !', 400))
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return response.status(401).json({
      success:false,
      message:'Invalid Email & Password !'
    })
    // next(new ErrorHandler('Invalid Email & Password !', 401))
  }

  const isPasswordMacted = await user.comparePassword(password);

  if (!isPasswordMacted) {
    return  response.status(401).json({
      success:false,
      message:'Invalid Email & Password !'
    })
    //  next(new ErrorHandler('Invalid Email & Password !', 401))
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
