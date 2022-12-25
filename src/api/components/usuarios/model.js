const mongoose = require('mongoose')
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const userSchema = mongoose.Schema({
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
    nombre_usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
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
        unique: true
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