const { UsersService } = require('../services');

module.exports = async (req, res) => {
    const userId = req.params.id;
  const user = await UsersService.getByUserId(userId);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  res.status(200).json(user);
};
