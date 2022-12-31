const Comment = require('./model')

function comments(req, res) {
    Comment.find((error, data) => {
        if (!error) {
            res.send(data)
        } else {
            res.status(400).json({ code: 400, message: 'Error al mostrar el listado de comentarios' })
        }
    })
}

function comment(req, res) {
    Comment.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.status(400).json({ code: 400, message: 'Error al mostrar el comentario' })
        }
    })
}

function create(req, res) {
    const comentario = new Comment({
        contenido: req.body.contenido,
        usuario_id: req.body.usuario_id,
        publicacion_id: req.body.publicacion_id
    })

    comentario.save((err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Comentario añadido con éxito', comment: data })
        } else {
            res.status(400).json({ code: 400, message: 'Error al insertar el comentario' })
        }
    })
}

function remove(req, res) {
    Comment.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Comentario borrado con éxito', comment: data })
        } else {
            res.status(400).json({ code: 400, message: 'Error al borrar el comentario' })
        }
    })
}

function update(req, res) {
    const comentario = ({
        contenido: req.body.contenido,
        usuario_id: req.body.usuario_id,
        publicacion_id: req.body.publicacion_id
    })

    Comment.findByIdAndUpdate(req.params.id, { $set: comentario}, { new: true }, (err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Comentario modificado con éxito', comment: data })
        } else {
            console.log(err)
            res.status(400).json({ code: 400, message: 'Error al modificar el comentario' })
        }
    })
}

module.exports = {
    comments: (req, res) => comments(req, res),
    comment: (req, res) => comment(req, res),
    create: (req, res) => create(req, res),
    remove: (req, res) => remove(req, res),
    update: (req, res) => update(req, res)
}