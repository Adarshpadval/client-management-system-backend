import express from 'express';
const app = express();

app.use(express.json());

module.exports = app;