const express = require('express');
const userRoutes = require('./routes/userRoutes');
const notebookRoutes = require('./routes/notebookRoutes');
const noteRoutes = require('./routes/noteRoutes');
const tagRoutes = require('./routes/tagRoutes');
const noteTagRoutes = require('./routes/noteTagRoutes');


const app = express();
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', notebookRoutes);
app.use('/api', noteRoutes);
app.use('/api', tagRoutes);
app.use('/api', noteTagRoutes);



module.exports = app;