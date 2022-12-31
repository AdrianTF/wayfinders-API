const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: false
    },
    hora: {
        type: String, //Not sure?
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