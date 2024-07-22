// __test__/userRoutes.test.js
const request = require('supertest');
const { app, startServer } = require('../server');
const { sequelize } = require('../models');

describe('User Routes', () => {
    let server;
    let userId;
    let token;

    beforeAll(async () => {
        server = await startServer(); // Start server before tests
    });

    afterAll(async () => {
        await sequelize.close(); // Close the database connection
        server.close(); // Stop the server
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ username: 'newuser', email: 'new@example.com', password: 'newpassword' });

        expect(response.statusCode).toBe(201);
        expect(response.body.username).toBe('newuser');
        userId = response.body.id; // Store user ID for subsequent tests
    });

    it('should log in a user and return a token', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ email: 'new@example.com', password: 'newpassword' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token; // Store token for subsequent tests
    });

    it('should get a specific user by ID', async () => {
        const response = await request(app)
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe('newuser');
    });

    it('should update a user by ID', async () => {
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'updateduser', email: 'updated@example.com', password: 'newpassword' });

        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe('updateduser');
    });

    it('should delete a user by ID', async () => {
        const response = await request(app)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User deleted');
    });
});
