// __test__/notebookRoutes.test.js
const request = require('supertest');
const { app, startServer } = require('../server');
const { sequelize } = require('../models');
require('dotenv').config();
const User = require('../models/User');
const Notebook = require('../models/Notebook');
const jwt = require('jsonwebtoken');


describe('Notebook Routes', () => {
    let server;
    let token;
    let userId;
    let notebookId;

    beforeAll(async () => {
        server = await startServer();
        await sequelize.sync({ force: true }); // Sync database

        // Create a test user and generate a token
        const user = await User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword' // Note: In a real test, this should be hashed
        });
        userId = user.id;
        token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    });

    afterAll(async () => {
        await sequelize.close(); // Close the database connection
        server.close(); // Stop the server
    });

    it('should create a new notebook', async () => {
        const response = await request(app)
            .post('/api/notebooks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'My Notebook' });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('My Notebook');
        notebookId = response.body.id; // Store notebook ID for subsequent tests
    });

    it('should get all notebooks for the authenticated user', async () => {
        const response = await request(app)
            .get('/api/notebooks')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get a specific notebook by ID', async () => {
        const response = await request(app)
            .get(`/api/notebooks/${notebookId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('My Notebook');
    });

    it('should update a specific notebook by ID', async () => {
        const response = await request(app)
            .put(`/api/notebooks/${notebookId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Notebook' });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Updated Notebook');
    });

    it('should delete a specific notebook by ID', async () => {
        const response = await request(app)
            .delete(`/api/notebooks/${notebookId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Notebook deleted');
    });
});