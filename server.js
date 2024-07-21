require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT
const startServer = async () => {
    try {

    } catch (error) {
        console.log('Error syncing database: ', error);
    }
}
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
}); 