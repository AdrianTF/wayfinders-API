const mongoose = require('mongoose')
const cats = ['senderismo', 'bicicleta', 'kayak'] //TODO add cats

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
    fotos: [{
        type: String,
    }],
    privacidad: {
        type: String,
        enum: ['privado', 'amigos', 'publico']
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