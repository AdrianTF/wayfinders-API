const Comment = require('./model')
const send = require('../../../utils/response')
const log = require('../../../utils/log')

function comments(req, res) {
    Comment.find((error, data) => {
        if (!error) {
            send.response200(res, data)
            log.write('testing') //Testing logs
            //res.send(data)
        } else {
            send.response404(res)
        }
    })
}

function comment(req, res) {
    Comment.findById(req.params.id, (err, data) => {
        if (!err) {
            send.response200(res, data)
        } else {
            send.response404(res)
        }
    })
}

function create(req, res) {
    //TODO when creating an object, get the local date and time and add it to the object
    const comentario = new Comment({
        contenido: req.body.contenido,
        usuario_id: req.body.usuario_id,
        publicacion_id: req.body.publicacion_id
    })

    comentario.save((err, data) => { //TODO mongo functions inside services/mongo files
        if (!err) {
            send.response201(res, data)
            //res.status(200).json({ code: 200, message: 'Comentario añadido con éxito', comment: data })
        } else {
            send.response204(res)
            //res.status(400).json({ code: 400, message: 'Error al insertar el comentario' })
        }
    })
}

function remove(req, res) {
    Comment.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            send.response200(res, data)
            //res.status(200).json({ code: 200, message: 'Comentario borrado con éxito', comment: data })
        } else {
            send.response204(res)
            //res.status(400).json({ code: 400, message: 'Error al borrar el comentario' })
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
            send.response200(res, data)
            //res.status(200).json({ code: 200, message: 'Comentario modificado con éxito', comment: data })
        } else {
            send.response204(res)
            //res.status(400).json({ code: 400, message: 'Error al modificar el comentario' })
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