const { syncModels } = require('./models');
require('dotenv').config();
const app = require('./app');


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