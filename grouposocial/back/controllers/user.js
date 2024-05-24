/* eslint-disable no-unused-vars */
import { Op } from 'sequelize';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Generate secret key for web token
export const secretKey = crypto.randomBytes(32).toString('hex');

// Signup user controller
export const signupUser = async (req, res, next) => {
  try {
    // Check if email and password are provided
    if (!req.body.email || !req.body.password) {
      return res.status(400).send(new Error('Bad request!'));
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(403).send(new Error('User with this email already exists!'));
    }

    // Generate salt and hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create user account
    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });

    if (!newUser) {
        return res.status(500).json({ message: "Error creating new user." });
    }

    // Return success response
    return res.status(200).json({ message: 'User created successfully.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error in user signup route.' });
  }
};

// Login user controller
export const loginUser = async (req, res, next) => {
  try {
    // Check if email and password are provided
    if (!req.body.email || !req.body.password) {
      return res.status(400).send(new Error('Bad request!'));
    }

    // Find user by email
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (!existingUser) {
      return res.status(404).send(new Error('User not found!'));
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ _id: existingUser.id }, secretKey, { expiresIn: '1h' });

    // Return user ID and token
    return res.status(200).json({ userId: existingUser.id, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Error logging in user.' });
  }
};