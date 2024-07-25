import express from 'express';
import { loginUser, signupUser, deleteUser } from '../controllers/user.js';
import verifyToken from '../jwtMiddleware.js';

// const { verifyToken, upload } = require('../jwtMiddleware.js');
//import verifyToken, { upload } from '../jwtMiddleware.js';

const router = express.Router();
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/deleteAccount', verifyToken, deleteUser);


// router.post('/sauces', verifyToken, upload.single('image'), sauceCtrl.addSauce);
// router.put('/sauces/:id', verifyToken, upload.single('image'), sauceCtrl.updateSauce);

export default router;