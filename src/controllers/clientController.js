import { getAllClients as fetchAllClients, getClientById as fetchClientById, createClient as addClient, updateClient as modifyClient, deleteClient as removeClient } from '../models/Client.js';

// Get all clients
export const getClients = (req, res) => {
  fetchAllClients((err, results) => {
    if (err) return res.status(500).json({ message: 'Internal Server Error' });
    res.status(200).json(results);
  });
};

// Get client by ID
export const getClientById = (req, res) => {
  const clientId = req.params.id;
  fetchClientById(clientId, (err, client) => {
    if (err) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(client);
  });
};

// Create a new client
export const createClient = (req, res) => {
  const clientData = req.body;
  addClient(clientData, (err, newClient) => {
    if (err) return res.status(500).json({ message: 'Internal Server Error' });
    res.status(201).json(newClient);
  });
};

// Update an existing client
export const updateClient = (req, res) => {
  const clientId = req.params.id;
  const clientData = req.body;
  modifyClient(clientId, clientData, (err, result) => {
    if (err) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(result);
  });
};

// Delete a client
export const deleteClient = (req, res) => {
  const clientId = req.params.id;
  removeClient(clientId, (err, result) => {
    if (err) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(result);
  });
};
