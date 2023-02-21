const mongoose = require('mongoose')
const config = require('../../../config/config')

const userPostSchema = mongoose.Schema({
    fecha: {
        type: String,
        required: false
    },
    hora: {
        type: String,
        required: false
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    cat: {
        type: String,
        enum: config.ROUTE_CATEGORIES,
        default: config.ROUTE_DEFAULT_CATEGORY
    },
    km_distancia: {
        type: Number,
        min: 0
    },
    dificultad: {
        type: String,
        enum: config.ROUTE_DIFFICULTY
    },
    min_duracion: {
        type: Number,
        min: 0
    },
    contenido: {
        type: String
    },
    fotos: [{
        type: String,
    }],
    privacidad: {
        type: String,
        enum: config.ROUTE_PRIVACY
    },
    coordenadas: [[{
        type: Number
    }]],
    usuario_id: {
        type: String,
        required: true,
        trim: true,
    },
})

let userPost = mongoose.model('Post', userPostSchema);
module.exports = userPost;