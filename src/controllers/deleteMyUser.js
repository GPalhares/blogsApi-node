const jwt = require('jsonwebtoken');
const { UsersService } = require('../services');

const { JWT_SECRET } = process.env;

module.exports = async (req, res) => {
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, JWT_SECRET);
    const userEmail = decoded.email;
    const userId = await UsersService.getByEmail(userEmail);
        
    await UsersService.deleteUserById(userId.id);
  res.status(204).json();
};
