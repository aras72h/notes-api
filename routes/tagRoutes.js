// routes/tagRoutes.js
const express = require('express');
const router = express.Router();
const { Tag } = require('../models');
const { authenticateToken } = require('../middlewares/authMiddleware'); // Corrected import

// Create a new tag (requires authentication)
router.post('/tags', authenticateToken, async (req, res) => {
    try {
        const { name } = req.body;
        const newTag = await Tag.create({ name });
        res.status(201).json(newTag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all tags (requires authentication)
router.get('/tags', authenticateToken, async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific tag by ID (requires authentication)
router.get('/tags/:id', authenticateToken, async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a specific tag by ID (requires authentication)
router.put('/tags/:id', authenticateToken, async (req, res) => {
    try {
        const { name } = req.body;
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        tag.name = name !== undefined ? name : tag.name;
        await tag.save();
        res.status(200).json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a specific tag by ID (requires authentication)
router.delete('/tags/:id', authenticateToken, async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        await tag.destroy();
        res.status(200).json({ message: 'Tag deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
