import db from '../config/db.js';

// Get all clients
export const getAllClients = (callback) => {
  const query = 'SELECT * FROM clients';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching clients:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

// Get client by ID
export const getClientById = (id, callback) => {
  const query = 'SELECT * FROM clients WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching client:', err);
      return callback(err);
    }
    if (results.length === 0) {
      return callback(new Error('Client not found'));
    }
    callback(null, results[0]);
  });
};

// Create a new client
export const createClient = (clientData, callback) => {
  const { name, industry, contact } = clientData;
  const query = 'INSERT INTO clients (name, industry, contact) VALUES (?, ?, ?)';
  db.query(query, [name, industry, contact], (err, results) => {
    if (err) {
      console.error('Error creating client:', err);
      return callback(err);
    }
    callback(null, { id: results.insertId, ...clientData });
  });
};

// Update an existing client
export const updateClient = (id, clientData, callback) => {
  const { name, industry, contact } = clientData;
  const query = 'UPDATE clients SET name = ?, industry = ?, contact = ? WHERE id = ?';
  db.query(query, [name, industry, contact, id], (err, results) => {
    if (err) {
      console.error('Error updating client:', err);
      return callback(err);
    }
    if (results.affectedRows === 0) {
      return callback(new Error('Client not found'));
    }
    callback(null, { message: 'Client updated successfully' });
  });
};

// Delete a client
export const deleteClient = (id, callback) => {
  const query = 'DELETE FROM clients WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting client:', err);
      return callback(err);
    }
    if (results.affectedRows === 0) {
      return callback(new Error('Client not found'));
    }
    callback(null, { message: 'Client deleted successfully' });
  });
};
