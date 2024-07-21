// server.js
const { syncModels } = require('./models');
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not defined

const startServer = async () => {
    try {
        // Sync database
        await syncModels();
        // Start server
        const server = app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });

        return server; // Return server instance for testing
    } catch (error) {
        console.log('Error syncing database: ', error);
        throw error; // Re-throw to handle in caller
    }
};

if (require.main === module) {
    startServer(); // Only start the server if this is the main module
}

module.exports = { app, startServer }; // Export app and startServer for testing
