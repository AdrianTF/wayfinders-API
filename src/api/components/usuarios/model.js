const mongoose = require('mongoose')
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

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
        match: emailRegex
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
        default: 'uploads/users/default.jpg'
    },
    admin: {
        type: Boolean,
        default: false,
    }
})

let User = mongoose.model('User', userSchema);
module.exports = User;