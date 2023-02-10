const userPost = require('./model')
const send = require('../../../utils/response')
const log = require('../../../utils/log')
const moment = require('moment')

function posts(req, res) {
    userPost.find((error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res)
        }
        send.response200(res, data)
    })
}

function post(req, res) {
    userPost.findById(req.params.id, (error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res)
        }
        send.response200(res, data)
    })
}

function create(req, res) {
    const publicacion = new userPost({
        nombre: req.body.nombre,
        cat: req.body.cat,
        km_distancia: req.body.km_distancia,
        dificultad: req.body.dificultad,
        min_duracion: req.body.min_duracion,
        contenido: req.body.contenido,
        usuario_id: req.body.usuario_id,
        hora: moment().format('HH:mm:ss').toString(),
        fecha: moment().format('DD/MM/YYYY').toString(),
        privacidad: req.body.privacidad,
        coordenadas: req.body.coordenadas,
        fotos: []
    })

    publicacion.save((error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res)
        }
        send.response201(res, data)
    })
}

function remove(req, res) {
    userPost.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res)
        }
        send.response200(res, data)
    })
}

function update(req, res) {

    userPost.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res)
        }
        send.response200(res, data)
    })
}

module.exports = {
    posts: (req, res) => posts(req, res),
    post: (req, res) => post(req, res),
    create: (req, res) => create(req, res),
    remove: (req, res) => remove(req, res),
    update: (req, res) => update(req, res)
}