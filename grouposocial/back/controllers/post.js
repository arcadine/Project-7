/* eslint-disable no-unused-vars */
import { Op } from 'sequelize';
import Post from '../models/Post.js';


// Create a new post
export const createPost = async (req, res) => {
  const { content, imageUrl } = req.body;
  try {
    // Create post in database using request body content
    const post = await Post.create({ email: req.user.email, content, imageUrl });
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ message:  'Failed to create post' });
  }
};

// Get my posts
export const getMyPosts = async (req, res) => {
  try {
    // Query database to only fetch posts that current match user's email
    const posts = await Post.findAll({
      where: {
        email: req.user.email,
      },
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch user posts' });
  }
};
  
// Get all posts
export const getPosts = async (req, res) => {
  try {
    // Query database for all posts
    const posts = await Post.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message:  'Failed to fetch posts' });
  }
};
  
// Update post readers
export const updateReaders = async (req, res) => {
  const { id } = req.params;
  const { readerEmail } = req.body;
  try {
    const post = await Post.findByPk(id);
    if (post) {
      const readers = post.readers || [];
      readers.push(readerEmail);
      post.readers = readers;
      await post.save();
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ message:  'Post not found' });
    }
  } catch (error) {
    return res.status(500).json({ message:  'Failed to update readers' });
  }
};
  