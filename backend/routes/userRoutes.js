import express from 'express';
const router =  express.Router();
import { authUser,getUserProfile,logoutUSer, registerUser, updateUserProfile } from '../controller/userController.js';

import { protect}  from '../middleware/authMiddleware.js';

router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUSer)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

export default router;