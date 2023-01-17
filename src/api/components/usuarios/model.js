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
    fecha_alta: {
        type: Date,
        required: false
    },
    siguiendo: [{
        type: String,
    }],
    foto: {
        type: String
    },
    admin: {
        type: Boolean
    }
})

let User = mongoose.model('User', userSchema);
module.exports = User;