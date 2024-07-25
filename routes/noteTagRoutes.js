// routes/noteTagRoutes.js
const express = require('express');
const router = express.Router();
const { Note, Tag, NoteTag } = require('../models');
const { authenticateToken } = require('../middlewares/authMiddleware'); // Corrected import

// Associate a tag with a note (requires authentication)
router.post('/notes/:noteId/tags/:tagId', authenticateToken, async (req, res) => {
    try {
        const { noteId, tagId } = req.params;

        // Find the note and tag
        const note = await Note.findByPk(noteId);
        const tag = await Tag.findByPk(tagId);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }

        // Associate the tag with the note
        await note.addTag(tag);

        res.status(200).json({ message: 'Tag associated with note successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove a tag from a note (requires authentication)
router.delete('/notes/:noteId/tags/:tagId', authenticateToken, async (req, res) => {
    try {
        const { noteId, tagId } = req.params;

        // Find the note and tag
        const note = await Note.findByPk(noteId);
        const tag = await Tag.findByPk(tagId);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }

        // Disassociate the tag from the note
        await note.removeTag(tag);

        res.status(200).json({ message: 'Tag removed from note successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
