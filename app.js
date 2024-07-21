require('dotenv').config();
const express = require('express');
const { syncModels } = require('./models');

const app = express();
app.use(express.json());

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