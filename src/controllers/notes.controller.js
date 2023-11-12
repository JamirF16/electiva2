const {models} = require('../libs/sequelize');

class Services {
    async create(data){
        const newNote = await models.Note.create(data);
        return newNote;
    }

    async find(){
        const notes = await models.Note.findAll({
            include: ['user']
        });
        return notes;
    }

    async findOne(id){
        const note = await models.Note.findByPk(id);
        return note;
    }

    async update(id, changes){
        const note = await models.Note.findByPk(id);
        await note.update(changes);
        return note;
    }

    async delete_(id){
        const note = await models.Note.findByPk(id);
        await note.destroy();
        return {id};
    }
}

const controller = {};
const services = new Services();

controller.listNotes = async (req, res, next) => {
    try {
        const notes = await services.find();
        if(!notes){
            res.json({message: 'No notes'});
        }
        res.json(notes);
    } catch (error) {
        next(error)
    }
}

controller.createNote = async (req, res, next) => {
    try {
        const data = req.body;
        const {name, description, userId} = data;
        if(!name || !description || !userId){
            res.json({error: 'All fields are required'});
        }
        const newNote = await services.create(data);
        res.json(newNote);
    } catch (error) {
        next(error)
    }
}

controller.updateNote = async (req, res, next) => {
    try {
        const {id} = req.params;
        const changes = req.body;
        const {name, description, userId} = changes;
        const find = await services.findOne(id);
        if(!name || !description || userId){
            res.json({error: 'All fields are required'});
        }
        if(!find){
            res.json({error: 'Note not found'});
        }
        const note = await services.update(id, changes);
        res.json(note);
    } catch (error) {
        next(error)
    }
}

controller.deleteNote = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const find = await services.findOne(id);
        if(!find){
            res.json({error: 'Note not found'});
        }
        const note = await services.delete_(id);
        res.json(note);
    } catch (error) {
        next(error);
    }
}

controller.findNote = async (req, res, next) => {
    try {
        const {id} = req.params;
        const note = await services.findOne(id);
        if(!note){
            res.json({error: 'Note not found'});
        }
        res.json(note);
    } catch (error) {
        next(error)
    }
}

module.exports = controller;