import { getAllUsers as modelGetAllUsers, getUserById as modelGetUserById, createUser as modelCreateUser, updateUser as modelUpdateUser, deleteUser as modelDeleteUser } from '../models/User.js';

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

// Create a new user
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
