const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

async function register(username, password) {
    let existing = await User.findOne({ username });
    if (existing) throw { message:  'Потребителското име е заето!' };

    let user = new User({ username, password });
    return await user.save();
}

async function login(username, password) {
    let user = await User.findOne({ username });
    if (!user) throw { message: 'Грешно потребителско име или парола!', status: 404 };

    let areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) throw { message: 'Грешно потребителско име или парола!', status: 404 };

    let token = jwt.sign({ _id: user._id, username: user.username }, SECRET);

    return token;
}

async function getUserById(id) {
    const user = await User.findById(id);
    if (user) {
        return user;
    } else {
        return undefined;
    }
}

module.exports = {
    register,
    login,
    getUserById
};
