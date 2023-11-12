const {DataTypes, Model, Sequelize} = require('sequelize');

const USER_TABLE = 'users';
const UserSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },

    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },

    password: {
        allowNull: false,
        type: DataTypes.STRING
    },

    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
}

class User extends Model {
    static associate(models){
        this.hasMany(models.Note, {
            as: 'note',
            foreignKey: 'userId'
        });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        };
    }
}

module.exports = {USER_TABLE, UserSchema, User};