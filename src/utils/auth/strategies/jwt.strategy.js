const {Strategy, ExtractJwt} = require('passport-jwt');
require('dotenv').config();
const SECRET = process.env.SECRET;
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
};

const JwtStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload);
});

module.exports = {JwtStrategy};