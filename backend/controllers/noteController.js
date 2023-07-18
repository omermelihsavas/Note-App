const mongoose = require('mongoose');
const noteModel = require('../models/noteModel');

const createNote = async (req, res) => {
    const {title, explanation} = req.body;

    const emptyAreas = [];

    if (!title) {
        emptyAreas.push('title');
    }

    if (!explanation) {
        emptyAreas.push('explanation');
    }

    if (emptyAreas.length > 0) {
        return res.status(400).json({error:'Alanlar boş geçilemez!', emptyAreas});
    }

    try {
        const user_id = req.user._id;
        const note = await noteModel.create({title, explanation, user_id});
        res.status(200).json(note);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
};

const bringNotes = async (req, res) => {
    const user_id = req.user._id;

    const notes = await noteModel.find({user_id}).sort({
        createdAt: -1
    });
    res.status(200).json(notes);
}; 

const bringNote = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'ID geçersiz.'});
    }

    const note = await noteModel.findById(id);

    if (!note) {
        return res.status(404).json({error: 'Not bulunamadı.'});
    }

    res.status(200).json(note);
}

const deleteNote = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'ID geçersiz.'});
    }

    const note = await noteModel.findOneAndDelete({ _id: id });

    if (!note) {
        return res.status(404).json({error: 'Not bulunamadı.'});
    }

    res.status(200).json(note);
}

const updateNote = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'ID geçersiz.'});
    }

    const note = await noteModel.findOneAndUpdate({ _id: id} , { ...req.body }, {new: true});

    if (!note) {
        return res.status(404).json({error: 'Not bulunamadı.'});
    }

    res.status(200).json(note);
}

module.exports = { createNote, bringNotes, bringNote, deleteNote, updateNote }