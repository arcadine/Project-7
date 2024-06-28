import express from 'express';
import { createPost, getPosts, getMyPosts, updateReaders } from '../controllers/post.js';
import verifyToken, { upload } from '../jwtMiddleware.js';

const router = express.Router();
router.post('/createPost', verifyToken, upload.single('imageUrl'), createPost);
router.get('/getMyPosts', verifyToken, getMyPosts);
router.get('/getPosts', getPosts);
router.put('/updateReaders/:id/readers', updateReaders);

export default router;