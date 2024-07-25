/* eslint-disable no-unused-vars */
import { Op } from 'sequelize';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Generate secret key for web token
// eslint-disable-next-line no-undef
export const secretKey = process.env.SECRET_KEY;

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
      return res.status(400).json({ message: 'Make sure to include both your email and password.'});
    }

    // Find user by email
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist.'});
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
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

export const deleteUser = async (req, res, next) => {
  const { email, password } = req.body
  console.log(email);
  console.log(password);

  try {
    // Check if email and password are provided (redundant)
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password not provided!' });
    }

    // Look up user in database
    const user = await User.findOne({ where: { email } });
    console.log('user: ', user);

    // Redundant; email submitted in form is compared against currently logged in user's email on front-end
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare submitted password to password stored in database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('passwords match: ', isMatch);

    if(!isMatch) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    // Delete user from database
    await User.destroy({ where: { email } });

    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Error deleting user.'});
  }
};