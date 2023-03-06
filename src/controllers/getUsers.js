const { UsersService } = require('../services');

module.exports = async (req, res) => {
  const users = await UsersService.getUsers();
  res.status(200).json(users);
};
