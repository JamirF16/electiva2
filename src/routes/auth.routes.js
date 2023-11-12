const { Router } = require('express');
const passport = require('passport');
const {controller} = require('../controllers/auth.controller');

const router = Router();

router.post('/',
    passport.authenticate('local', { session: false }), controller.login);

module.exports = router;