const {models} = require('../libs/sequelize');
const bcrypt = require('bcrypt');

async function hash(password){
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

class Services {
    async create(data){
        const hashPassword = await hash(data.password);
        const newUser = await models.User.create({
            ...data,
            password: hashPassword
        });
        return(newUser);
    }

    async find(){
        const users = await models.User.findAll({
            include: ['note'],
            order: [['id', 'ASC']]
        });
        return users;
    }

    async findOne(id){
        const user = await models.User.findByPk(id, {
            include: ['note']
        });
        return user;
    }

    async update(id, changes){
        const hashPassword = await hash(changes.password);
        const user = await models.User.findByPk(id);
        await user.update({
            ...changes,
            password: hashPassword
        });
        return user;
    }

    async delete_(id){
        const user = await models.User.findByPk(id);
        user.destroy();
        return {id};
    }

    async findByEmail(email){
        const user = await models.User.findOne({
            where: {email}
        })
        return user;
    }
}

const controller = {};
const services = new Services();

controller.listUsers = async (req, res, next) => {
    try {
        const users = await services.find();
        if(!users){
            res.json({message: 'No users'})
        }
        res.json(users);
    } catch (error) {
        next(error);
    }
}

controller.createUser = async (req, res, next) => {
    try {
        const data = req.body;
        const {email, password} = data
        if(!email || !password){
            res.json({error: 'All field are required'});
        }
        const existingEmail = await services.findByEmail(email);
        if(existingEmail){
            res.json({error: 'The mail is already registered'});
        }
        const newUser = await services.create(data);
        res.json(newUser);
    } catch (error) {
        next(error)
    }
}

controller.updateUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const changes = req.body;
        const {email, password} = changes;
        const find = await services.findOne(id);
        if(!email || !password){
            res.json({message: 'All fields are required'});
        }
        if(!find){
            res.json('User not found');
        }
        const user = await services.update(id, changes);
        res.json(user);
    } catch (error) {
        next(error)
    }
}

controller.deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const find = await services.findOne(id);
        if(!find){
            res.json({error: 'User not found'});
        }
        const user = await services.delete_(id);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

controller.findUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await services.findOne(id);
        if(!user){
            res.json({error: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = controller;