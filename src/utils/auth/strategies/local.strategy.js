const { Strategy } = require('passport-local');
const {Services} = require('../../../controllers/auth.controller');
const bcrypt = require('bcrypt');
const services = new Services();

const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await services.findByEmail(email);
        if (!user) {
            done(null, false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false)
    }
});

module.exports = { localStrategy };