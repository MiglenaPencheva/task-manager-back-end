const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const config = require('../config/config');

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: ['Username is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
});

userScheme.pre('save', async function (next) {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

module.exports = mongoose.model('User', userScheme);