const {Note, NoteSchema} = require('./note.model');
const {User, UserSchema} = require('./user.model');

const setupModels = (sequelize) => {
    Note.init(NoteSchema, Note.config(sequelize));
    User.init(UserSchema, User.config(sequelize));

    Note.associate(sequelize.models);
    User.associate(sequelize.models);
}

module.exports = {setupModels}