const express = require('express');
const router = express.Router();
const Note = require('../models/Note.js');

// GET all notes
router.get('/', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

// POST new note
router.post('/', async (req, res) => {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json(newNote);
});

// PUT update note
router.put('/:id', async (req, res) => {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
});

// DELETE note
router.delete('/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
});

module.exports = router;
