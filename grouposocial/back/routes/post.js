import express from 'express';
import { createPost, getPosts, getMyPosts, updateReaders } from '../controllers/post.js';
import verifyToken, { upload } from '../jwtMiddleware.js';

const router = express.Router();
router.post('/posts', verifyToken, upload.single('image'), createPost);
router.get('/posts', verifyToken, getMyPosts);
router.get('/posts', getPosts);
router.put('/posts/:id/readers', updateReaders);

export default router;