const experss = require('express');
const router = experss.Router();

const {registerUser,loginUser,logoutUser} = require('../controllers/authController')


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)


module.exports = router 