const experss = require("express");
const router = experss.Router();

const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/profile/:id").get(protect, getUserProfile)

router.route("/update").put(protect, updateUserProfile);

module.exports = router;
