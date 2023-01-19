const Comment = require('./model')
const send = require('../../../utils/response')
const log = require('../../../utils/log')
const moment = require('moment')

function comments(req, res) {
    Comment.find((error, data) => {
        if (!error) {
            send.response200(res, data)
        } else {
            log.write(err)
            send.response404(res)
        }
    })
}

function comment(req, res) {
    Comment.findById(req.params.id, (err, data) => {
        if (!err) {
            send.response200(res, data)
        } else {
            log.write(err)
            send.response404(res)
        }
    })
}

function create(req, res) {
    const comentario = new Comment({
        contenido: req.body.contenido,
        usuario_id: req.body.usuario_id,
        publicacion_id: req.body.publicacion_id,
        hora: moment().format('HH:mm:ss').toString(),
        fecha: moment().format('DD/MM/YYYY').toString()
    })

    comentario.save((err, data) => { //TODO mongo functions inside services/mongo files
        if (!err) {
            send.response201(res, data)
        } else {
            log.write(err)
            send.response404(res)
        }
    })
}

function remove(req, res) {
    Comment.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            send.response200(res, data)
        } else {
            log.write(err)
            send.response404(res)
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
        } else {
            log.write(err)
            send.response404(res)
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