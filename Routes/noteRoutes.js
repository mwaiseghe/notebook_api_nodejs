const {Router} = require('express');
const { createNote, getNotes, getSingleNote, updateNote, deleteNote } = require('../Controllers/noteController');
const noteRoutes = Router();

noteRoutes.post('/', createNote);
noteRoutes.get('/', getNotes);
noteRoutes.get('/:id', getSingleNote);
noteRoutes.put('/:id', updateNote);
noteRoutes.delete('/:id', deleteNote);

module.exports = {
    noteRoutes,
}
