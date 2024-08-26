import express from 'express';
import { loginUser, signupUser, deleteUser } from '../controllers/user.js';
import verifyToken from '../middleware.js';

const router = express.Router();
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/deleteAccount', verifyToken, deleteUser);

export default router;