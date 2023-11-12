const {DataTypes, Model, Sequelize} = require('sequelize');
const {USER_TABLE} = require('./user.model');
const NOTE_TABLE = 'notes';
const NoteSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },

    name: {
        allowNull: false,
        type: DataTypes.STRING
    },

    description: {
        allowNull: false,
        type: DataTypes.STRING
    }, 

    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Note extends Model {
    static associate(models){
        this.belongsTo(models.User, {
            as: 'user'
        })
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: NOTE_TABLE,
            modelName: 'Note',
            timestamps: false
        };
    }
}

module.exports = {NOTE_TABLE, NoteSchema, Note};