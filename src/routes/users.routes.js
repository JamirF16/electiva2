const {Router} = require('express');
const {
    listUsers,
    createUser,
    updateUser,
    deleteUser,
    findUser
} = require('../controllers/users.controller');
const {userSchema} = require('../schemas/user.schema');
const validatorFields = require('../middlewares/validatorMiddleware');
const passport = require('passport')

const router = Router();

const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/users', listUsers)
router.post('/users/create', jwtAuth, validatorFields(userSchema, "body"), createUser)
router.patch('/users/update/:id', jwtAuth, validatorFields(userSchema, "body"), updateUser)
router.delete('/users/delete/:id', jwtAuth, deleteUser);
router.get('/users/find/:id', jwtAuth, findUser);

module.exports = router;