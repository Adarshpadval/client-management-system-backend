import { getAllClients as fetchAllClients, getClientById as fetchClientById, createClient as addClient, updateClient as modifyClient, deleteClient as removeClient } from '../models/Client.js';

// Get all clients
export const getClients = async (req, res) => {
  try {
    const clients = await fetchAllClients();
    if (clients.length === 0) {
      return res.status(404).json({ message: 'No clients found' });
    }
    return res.status(200).json({ message: 'Clients fetched successfully', data: clients });
  } catch (err) {
    console.error('Error fetching clients:', err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// Get client by ID
export const getClientById = async (req, res) => {
  const clientId = req.params.id;
  try {
    const client = await fetchClientById(clientId);
    if (!client) {
      return res.status(404).json({ message: `Client with ID ${clientId} not found` });
    }
    return res.status(200).json({ message: 'Client fetched successfully', data: client });
  } catch (err) {
    console.error('Error fetching client by ID:', err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// Create a new client
export const createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = await addClient(clientData);
    return res.status(201).json({ message: 'Client created successfully', data: newClient });
  } catch (error) {
    console.error('Error creating client:', error);
    return res.status(500).json({ message: 'Failed to create client', error: error.message });
  }
};

// Update an existing client
export const updateClient = async (req, res) => {
  const clientId = req.params.id;
  const clientData = req.body;
  try {
    const updatedClient = await modifyClient(clientId, clientData);
    if (!updatedClient) {
      return res.status(404).json({ message: `Client with ID ${clientId} not found` });
    }
    return res.status(200).json({ message: 'Client updated successfully', data: updatedClient });
  } catch (err) {
    console.error('Error updating client:', err);
    return res.status(500).json({ message: 'Failed to update client', error: err.message });
  }
};

// Delete a client
export const deleteClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    const deletedClient = await removeClient(clientId);
    if (!deletedClient) {
      return res.status(404).json({ message: `Client with ID ${clientId} not found` });
    }
    return res.status(200).json({ message: 'Client deleted successfully', data: deletedClient });
  } catch (err) {
    console.error('Error deleting client:', err);
    return res.status(500).json({ message: 'Failed to delete client', error: err.message });
  }
};
