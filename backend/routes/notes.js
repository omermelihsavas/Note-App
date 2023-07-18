const express = require('express');
const { createNote, bringNotes, bringNote, deleteNote, updateNote } = require('../controllers/noteController');
const authControl = require('../middlewares/authControl');

const router = express.Router();

router.use(authControl);

router.get('/', bringNotes); 

//GET
router.get('/:id', bringNote);

//POST
router.post('/', createNote);

//DELETE
router.delete('/:id', deleteNote);

//UPDATE
router.patch('/:id', updateNote);

module.exports = router;