// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const { Note, User, Notebook } = require('../models');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Create a new note
router.post('/notes', authenticateToken, async (req, res) => {
    try {
        const { title, content, notebookId } = req.body;
        const userId = req.user.id;
        const notebook = await Notebook.findOne({ where: { id: notebookId, userId } });

        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found' });
        }

        const newNote = await Note.create({ title, content, notebookId, userId });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all notes for the authenticated user
router.get('/notes', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await Note.findAll({ where: { userId } });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific note
router.get('/notes/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const note = await Note.findOne({ where: { id: req.params.id, userId } });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a specific note
router.put('/notes/:id', authenticateToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;
        const note = await Note.findOne({ where: { id: req.params.id, userId } });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        note.title = title !== undefined ? title : note.title;
        note.content = content !== undefined ? content : note.content;
        await note.save();

        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a specific note
router.delete('/notes/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const note = await Note.findOne({ where: { id: req.params.id, userId } });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        await note.destroy();
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
