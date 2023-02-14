const express = require("express");
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/authMiddleware')
const {
  getAllProducts,
  newProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/productController");

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles('admin'),newProduct);
router.route("/product/:id").get(getSingleProduct)
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

module.exports = router;
