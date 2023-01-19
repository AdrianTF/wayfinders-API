const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    fecha: {
        type: String,
        required: false
    },
    hora: {
        type: String,
        required: false
    },
    contenido: {
        type: String,
        required: true
    },
    usuario_id: {
        type: String,
        required: true,
        trim: true
    },
    publicacion_id: {
        type: String,
        required: true,
        trim: true
    }
})

let Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;