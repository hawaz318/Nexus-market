const userService = require('../services/user.service');
const { createSendToken } = require('../utils/jwt');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await userService.createUser({
      name,
      email,
      password,
      role
    });

    // ADVANCED: Automatically log the user in after signing up
    createSendToken(newUser, 201, res);
    
  } catch (err) {
    next(err);
  }
};