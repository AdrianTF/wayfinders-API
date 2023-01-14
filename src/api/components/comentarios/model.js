const mongoose = require('mongoose')

/*We can use 
{
    type: Date,
    default: Date.now
}*/

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