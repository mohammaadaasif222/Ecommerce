const Product = require("../models/productModel");

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/cathAsyncErrorsMiddleware')
const APIFeatures = require('../utils/APIFeatures')


// Create new product
exports.newProduct = catchAsyncErrors( async (request, response) => {

  request.body.user = request.user.id
  const product = await Product.create(request.body);
  response.status(201).json({
    success: true,
    product,
  });
})

// get all prodcuts

exports.getAllProducts =catchAsyncErrors( async (request, response, next) => {

  const resPerPage = 10;
  const countProduct = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(),request.query).search().filter().pagination(resPerPage)

  const products = await apiFeatures.query;
  response.status(200).json({
    success: true,
    size:products.length,
    resPerPage,
    countProduct,
    products,
  });
});
   

// get single product

exports.getSingleProduct = catchAsyncErrors( async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if(!product){
    return next(new ErrorHandler('Product cannot found',404))
  }
  response.status(200).json({
    success:true,
    product
  });
});

// Update product 

exports.updateProduct = catchAsyncErrors(async(request , response, next)=>{

  let product  = await Product.findById(request.params.id);

  if(!product){
    return next(new ErrorHandler('Product not Found !', 404))
  }

  product = await Product.findOneAndUpdate(request.params.id, request.body,{
    new:true,
    runValidators: true,
    useFindAndModify:false
  })

  response.status(200).json({
    success:true,
    product
  })

})


// Delete single product

exports.deleteProduct = catchAsyncErrors( async(request, response , next)=>{
 const product = await Product.findById(request.params.id);
 
 if(!product){
  return next(new ErrorHandler('Product cannot found',404))
 }
 
 await product.remove();
 response.status(200).json({
    success:true,
    messege:"Product deleted succfully!"
 })
})
