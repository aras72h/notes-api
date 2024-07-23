const express = require('express');
const userRoutes = require('./routes/userRoutes');
const notebookRoutes = require('./routes/notebookRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', notebookRoutes);
app.use('/api', noteRoutes);


module.exports = app;