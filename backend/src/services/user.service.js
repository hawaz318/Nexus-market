const User = require('../models/user.model');

exports.createUser = async (userData) => {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    // 2. Create the user
    const newUser = await User.create(userData);

    // 3. Remove password from output for security
    newUser.password = undefined;
    return newUser;
};