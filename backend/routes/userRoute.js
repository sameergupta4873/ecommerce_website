const express = require('express');
const {authController, getUserProfile, registerUser, updateUserProfile, getUserById} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')


const router = express.Router();

router.route('/').post(registerUser)
router.route('/:id').get(getUserById)

router.post('/login',authController)


router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile );

module.exports = router;