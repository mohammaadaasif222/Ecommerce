const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/cathAsyncErrorsMiddleware');
const sendToken = require('../utils/jwtToken');

exports.registerUser= catchAsyncErrors(async(request, response, next)=>{
    const {name, email , password } = request.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'1197309358',
            url:'https://res.cloudinary.com/www-draggital-com/image/upload/v1637315871/high-fashion-model-metallic-silver-260nw-1197309358_pkrj9h.webp'
        }
    })


    sendToken(user, 201, response)

    
})

// login user 

exports.loginUser= catchAsyncErrors(async( request , response, next)=>{
    const {email , password }= request.body;

    if(!email || !password){
        return next(new ErrorHandler('Please enter Password & Email ',400))
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid Password & Email ',401))
    }

    const isPasswordMacted = await user.comparePassword(password)

    if(!isPasswordMacted){
        return next(new ErrorHandler('Invalid Password & Email ',401))
    }

    sendToken(user , 201,response);

})

exports.logoutUser = catchAsyncErrors(async(request , response, next)=>{
    response.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    response.status(200).json({
        success:true,
        message:'Logout successfully !'
    })
})