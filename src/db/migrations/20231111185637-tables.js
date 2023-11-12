const {NOTE_TABLE, NoteSchema} = require('../models/note.model');
const {USER_TABLE, UserSchema} = require('../models/user.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(NOTE_TABLE, NoteSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
