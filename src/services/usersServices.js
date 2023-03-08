const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = ({ email, displayName, password, image }) => User
.create({ displayName, password, email, image });

const getUsers = () => User.findAll();

const getByUserId = (userId) => User.findByPk(userId);

const deleteUserById = async (userId) => {
    const result = await User.destroy({ where: { id: userId } });
    return result;
};

module.exports = {
    getByEmail,
    createUser,
    getUsers,
    getByUserId,
    deleteUserById,
};
