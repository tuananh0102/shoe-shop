const mongoose = require('mongoose');
const path = require('path');

const userSchema = mongoose.Schema({
    name: {type: String, requires: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    resetToken: {type: String},
    isAdmin: {type: Boolean, default: false, required: true},
    image: {type: String, default: '/images/user/unknow.jpg'}
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;