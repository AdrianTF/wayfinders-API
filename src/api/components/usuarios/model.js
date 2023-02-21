const mongoose = require('mongoose')
const config = require('../../../config/config')


const userSchema = mongoose.Schema({
    _id: {
        type: String,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: config.USER_EMAIL_REGEX
    },
    fecha: {
        type: String,
        required: false
    },
    hora: {
        type: String,
        required: false
    },
    siguiendo: [{
        type: String,
    }],
    foto: {
        type: String,
        default: config.DEFAULT_USER_IMAGE
    },
    admin: {
        type: Boolean,
        default: false,
    }
})

let User = mongoose.model('User', userSchema);
module.exports = User;