const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const APIFeatures = require("../utils/APIFeatures");
const cloudinary = require("cloudinary").v2;
// Create new product
exports.newProduct = catchAsyncErrors(async (request, response) => {
  console.log(request.body);
  const result = await cloudinary.uploader.upload(request.body.images, {
    folder: "products",
    width: 150,
    crop: "scale",
  });
  const { name, price, description, category, seller, stock } = request.body;
  const data = {
    name,
    price,
    description,
    category,
    seller,
    stock,
    images: [
      {
        public_id: result.public_id,
        url: result.secure_url,
      },
    ],
  };
  console.log(data);

  request.body.user = request.user.id;
  const product = await Product.create(data);
  response.status(201).json({
    success: true,
    product,
  });
});

// get all prodcuts

exports.getAllProducts = catchAsyncErrors(async (request, response, next) => {
  const resPerPage = 8;
  const countProduct = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), request.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;
  response.status(200).json({
    success: true,
    size: products.length,
    resPerPage,
    countProduct,
    products,
  });
});
exports.getAdminProducts = catchAsyncErrors(async (request, response, next) => {
  const products = await Product.find();
  response.status(200).json({
    success: true,
    products,
  });
});

// get single product

exports.getSingleProduct = catchAsyncErrors(async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if (!product) {
    return next(new ErrorHandler("Product cannot found", 404));
  }
  response.status(200).json({
    success: true,
    product,
  });
});

// Update product

exports.updateProduct = catchAsyncErrors(async (request, response, next) => {
  let product = await Product.findById(request.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found !", 404));
  }

  product = await Product.findOneAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  response.status(200).json({
    success: true,
    product,
  });
});

// Delete single product

exports.deleteProduct = catchAsyncErrors(async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if (!product) {
    return next(new ErrorHandler("Product cannot found", 404));
  }

  await product.remove();
  response.status(200).json({
    success: true,
    messege: "Product deleted succfully!",
  });
});
