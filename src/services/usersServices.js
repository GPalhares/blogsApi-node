const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = ({ email, displayName, password, image }) => User
.create({ displayName, password, email, image });

module.exports = {
    getByEmail,
    createUser,
};
