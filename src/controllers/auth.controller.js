const {models} = require('../libs/sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class Services {
    async findByEmail(email){
        const user = await models.User.findOne({
            where: {email}
        })
        return user;
    }
}

const controller = {};
controller.login = async (req, res, next) => {
    try {
        const user = req.user;
        const SECRET = process.env.SECRET;
        const payload = {
            sub: user.id,
            email: user.email
        }
        const token = jwt.sign(payload, SECRET);
        res.json({
            user,
            token
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {Services, controller};
