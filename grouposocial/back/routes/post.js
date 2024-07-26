import express from 'express';
import { createPost, getPosts, getMyPosts, updateReaders, getPostById } from '../controllers/post.js';
import verifyToken, { upload } from '../jwtMiddleware.js';

const router = express.Router();
router.post('/createPost', verifyToken, upload.single('imageUrl'), createPost);
router.get('/getMyPosts', verifyToken, getMyPosts);
router.get('/getPosts', verifyToken, getPosts);
router.put('/updateReaders/:id/readers', verifyToken, updateReaders);
router.get('/getPostById/:postId', verifyToken, getPostById);

export default router;