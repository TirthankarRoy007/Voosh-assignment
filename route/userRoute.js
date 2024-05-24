import express from 'express';
import userController from '../controller/userController.js';
import { checkJwt, checkAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', userController.registerUser);
router.get('/profile', checkJwt, userController.getUserProfile);
router.post('/login', userController.loginUser);
router.put('/profile', checkJwt, userController.editUserProfile);
router.get('/users', checkJwt, userController.getAllUsers);
router.get('/admin/users', checkJwt, checkAdmin, userController.getAllUsers);

export default router;
