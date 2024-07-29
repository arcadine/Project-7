/* eslint-disable no-unused-vars */
import { Op } from 'sequelize';
import Post from '../models/Post.js';


// Create a new post
export const createPost = async (req, res) => {
  const { content, email } = req.body;
  try {
    let post;
    if(!req.file)
    {
      post = await Post.create({ content, email } );
      // Create post in database using request body content    
      console.log(post);
      return res.status(201).json(post);
    }
    else {
      const { filename } = req.file;
      const imageUrl = '//localhost:3000/images/' + filename;
      console.log(imageUrl);
      post = await Post.create({ content, imageUrl, email });
      // Create post in database using request body content    
      console.log(post);
      return res.status(201).json(post);
    }    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message:  'Failed to create post' });
  }
};

// Get my posts
export const getMyPosts = async (req, res) => {
  try {
    const { page = 1, limit = 5, email } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required; user must log in' });
    }

    const offset = (page - 1) * limit;
    
    // Query database for all posts with pagination support and in descending date order
    const { count, rows: posts } = await Post.findAndCountAll({
      where: {email},
      order: [['publishedDate', 'DESC']],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });
    const formattedPosts = posts.map(post => ({
      ...post.toJSON(),
      publishedDate: post.publishedDate.toISOString(),
    }));
    return res.status(200).json({
      posts: formattedPosts,
      totalPosts: count,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    return res.status(500).json({ message:  'Failed to fetch posts' });
  }
};
  
// Get all posts
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const offset = (page - 1) * limit;
    
    // Query database for all posts with pagination support and in descending date order
    const { count, rows: posts } = await Post.findAndCountAll({
      order: [['publishedDate', 'DESC']],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });
    const formattedPosts = posts.map(post => ({
      ...post.toJSON(),
      publishedDate: post.publishedDate.toISOString(),
    }));
    return res.status(200).json({
      posts: formattedPosts,
      totalPosts: count,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    return res.status(500).json({ message:  'Failed to fetch posts' });
  }
};

// Get individual post by ID
export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch post' });
  }
};