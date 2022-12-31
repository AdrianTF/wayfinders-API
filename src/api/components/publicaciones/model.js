const mongoose = require('mongoose')
const cats = ['senderismo', 'bicicleta', 'kayak'] //TODO add cats

const userPostSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: false
    },
    hora: {
        type: String, //Not sure?
        required: false
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    cat: {
        type: String,
        enum: cats,
        default: 'senderismo'
    },
    km_distancia: {
        type: Number,
        min: 0
    },
    dificultad: {
        type: String,
        enum: ['facil', 'media', 'dificil']
    },
    min_duracion: {
        type: Number,
        min: 0
    },
    contenido: {
        type: String
    },
    foto: {
        type: String
    },
    privacidad: {
        type: Boolean //TODO review
    },
    empresa: {
        type: String,
    },
    usuario_id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

let userPost = mongoose.model('Post', userPostSchema);
module.exports = userPost;