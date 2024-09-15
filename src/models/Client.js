import db from '../config/db.js';

// Get all clients
export const getAllClients = async () => {
  const query = 'SELECT * FROM clients';
  try {
    const [results] = await db.query(query);
    if (results.length === 0) {
      throw new Error('No clients found');
    }
    return results;
  } catch (err) {
    throw new Error('Error fetching clients: ' + err.message);
  }
};

// Get client by ID
export const getClientById = async (id) => {
  const query = 'SELECT * FROM clients WHERE client_id = ?';
  try {
    const [results] = await db.query(query, [id]);
    if (results.length === 0) {
      throw new Error(`Client with ID ${id} not found`);
    }
    return results[0];
  } catch (err) {
    throw new Error('Error fetching client: ' + err.message);
  }
};

// Create a new client
export const createClient = async (clientData) => {
  const { client_name, industry, contact_info, created_by } = clientData;
  const query = `
    INSERT INTO clients (client_name, industry, contact_info, created_by, created_at, updated_by, updated_at) 
    VALUES (?, ?, ?, ?, NOW(), ?, NOW())
  `;

  try {
    const [results] = await db.query(query, [client_name, industry, contact_info, created_by, created_by]);
    return { id: results.insertId, message: "Client created successfully" };
  } catch (error) {
    throw new Error('Error creating client: ' + error.message);
  }
};

// Update an existing client
export const updateClient = async (id, clientData) => {
  const { client_name, industry, contact_info, updated_by } = clientData;
  const query = `
    UPDATE clients 
    SET client_name = ?, industry = ?, contact_info = ?, updated_by = ?, updated_at = NOW() 
    WHERE client_id = ?
  `;

  try {
    const [results] = await db.query(query, [client_name, industry, contact_info, updated_by, id]);
    if (results.affectedRows === 0) {
      throw new Error(`Client with ID ${id} not found`);
    }
    return { message: 'Client updated successfully' };
  } catch (err) {
    throw new Error('Error updating client: ' + err.message);
  }
};

// Delete a client
export const deleteClient = async (id) => {
  const query = 'DELETE FROM clients WHERE client_id = ?';

  try {
    const [results] = await db.query(query, [id]);
    if (results.affectedRows === 0) {
      throw new Error(`Client with ID ${id} not found`);
    }
    return { message: 'Client deleted successfully' };
  } catch (err) {
    throw new Error('Error deleting client: ' + err.message);
  }
};
