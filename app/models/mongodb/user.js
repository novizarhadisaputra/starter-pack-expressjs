const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
    },
    sex: {
        type: String,
        enum: ['Male', 'Female'],
        required: [true]
    },
});

const User = mongoose.model('User', UserSchema)

module.exports = User;
