import { getAllUsers as modelGetAllUsers, getUserById as modelGetUserById, createUser as modelCreateUser,getUserByEmailAndPassword as modelGetUserByEmail, updateUser as modelUpdateUser, deleteUser as modelDeleteUser } from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
// Register a new user
export const registerUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password } = req.body;
    try {
      const hashedPassword = await hashPassword(password);
      const userData = { name, email, phone, password: hashedPassword };
      const newUser = await modelCreateUser(userData);
      res.status(201).json(newUser);
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
];


// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await modelGetUserByEmail(email, password);
    
    // Assuming you generate a JWT token or return user details here
    const token = generateToken(user); // Use your token generation logic
    
    res.json({
      message: 'Login successful',
      user,
      token,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(400).json({ message: error.message });
  }
};



// Function to hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await modelGetAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await modelGetUserById(userId);
    res.status(200).json(user);
  } catch (err) {
    if (err.message === 'User not found') {
      res.status(404).json({ message: 'User not found' });
    } else {
      console.error('Error fetching user:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// Create a new user (for testing or other purposes)
export const createUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await modelCreateUser(userData);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const result = await modelUpdateUser(userId, userData);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'User not found') {
      res.status(404).json({ message: 'User not found' });
    } else {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await modelDeleteUser(userId);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'User not found') {
      res.status(404).json({ message: 'User not found' });
    } else {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


// Generate JWT Token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  // Sign the token with a secret key (replace 'your_jwt_secret' with your own secret)
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'my_static_secret_key_1234', {
    expiresIn: '1h', // Token expires in 1 hour
  });

  return token;
};