const {Router} = require('express');
const {
    listNotes,
    createNote,
    updateNote,
    deleteNote,
    findNote
} = require('../controllers/notes.controller');
const {noteSchema} = require('../schemas/note.schema');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const passport = require('passport')
const {checkApiKey} = require('../middlewares/authMiddleware');

const router = Router();

const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/notes', jwtAuth, listNotes);
router.post('/notes/create', jwtAuth, validatorMiddleware(noteSchema, "body"), createNote);
router.patch('/notes/update/:id', jwtAuth, validatorMiddleware(noteSchema, "bodyy"), updateNote);
router.delete('/notes/delete/:id', jwtAuth, deleteNote);
router.get('/notes/find/:id', jwtAuth, findNote);


module.exports = router;