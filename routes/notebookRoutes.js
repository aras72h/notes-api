// routes/notebookRoutes.js

const express = require('express');
const router = express.Router();
const Notebook = require('../models/Notebook');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Create a new notebook
router.post('/notebooks', authenticateToken, async (req, res) => {
    try {
        const { title } = req.body;
        const newNotebook = await Notebook.create({
            title,
            userId: req.user.id // Associate notebook with the authenticated user
        });
        res.status(201).json(newNotebook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all notebooks for the authenticated user
router.get('/notebooks', authenticateToken, async (req, res) => {
    try {
        const notebooks = await Notebook.findAll({ where: { userId: req.user.id } });
        res.json(notebooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific notebook
router.get('/notebooks/:id', authenticateToken, async (req, res) => {
    try {
        const notebook = await Notebook.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id // Ensure the notebook belongs to the authenticated user
            }
        });
        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found' });
        }
        res.json(notebook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a specific notebook
router.put('/notebooks/:id', authenticateToken, async (req, res) => {
    try {
        const { title } = req.body;
        const notebook = await Notebook.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id // Ensure the notebook belongs to the authenticated user
            }
        });
        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found' });
        }
        notebook.title = title !== undefined ? title : notebook.title;
        await notebook.save();
        res.json(notebook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a specific notebook
router.delete('/notebooks/:id', authenticateToken, async (req, res) => {
    try {
        const notebook = await Notebook.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id // Ensure the notebook belongs to the authenticated user
            }
        });
        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found' });
        }
        await notebook.destroy();
        res.json({ message: 'Notebook deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
