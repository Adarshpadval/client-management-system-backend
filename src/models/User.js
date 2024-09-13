import db from '../config/db.js'; // Import database configuration

// Get all users
export const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  try {
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) {
      throw new Error('User not found');
    }
    return rows[0];
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
};

// Create a new user
export const createUser = async (userData) => {
  const { name, email, phone } = userData;
  const query = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
  try {
    const [result] = await db.query(query, [name, email, phone]);
    return { id: result.insertId, ...userData };
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

// Update an existing user
export const updateUser = async (id, userData) => {
  const { name, email, phone } = userData;
  const query = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?';
  try {
    const [result] = await db.query(query, [name, email, phone, id]);
    if (result.affectedRows === 0) {
      throw new Error('User not found');
    }
    return { message: 'User updated successfully' };
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = ?';
  try {
    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      throw new Error('User not found');
    }
    return { message: 'User deleted successfully' };
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
};
