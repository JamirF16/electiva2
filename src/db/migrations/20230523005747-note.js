'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const {USER_TABLE, UserSchema} = require('../models/user.model');
    await queryInterface.createTable(USER_TABLE, UserSchema)

    const {NOTE_TABLE, NoteSchema} = require('../models/note.model');
    await queryInterface.createTable(NOTE_TABLE, NoteSchema);
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
