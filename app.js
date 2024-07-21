require('dotenv').config();
const express = require('express');
const { syncModels } = require('./models');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT
const startServer = async () => {
    try {
        // Sync database
        await syncModels();
        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    } catch (error) {
        console.log('Error syncing database: ', error);
    }
}

startServer();