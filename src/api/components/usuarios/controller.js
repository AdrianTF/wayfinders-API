const User = require('./model')
const send = require('../../../utils/response')
const log = require('../../../utils/log')

function users(req, res) {
    User.find((error, data) => {
        if (!error) {
            send.response200(res, data)
        } else {
            send.response404(res)
        }
    })
}

function user(req, res) {
    User.findById(req.params.id, (err, data) => {
        if (!err) {
            send.response200(res, data)
        } else {
            send.response404(res)
        }
    })
}

function create(req, res) {
    const usuario = new User({
        _id: req.body._id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        password: req.body.password,
        email: req.body.email,
        siguiendo: req.body.siguiendo
    })

    usuario.save((err, data) => {
        if (!err) {
            send.response201(res, data)
        } else {
            send.response404(res)
        }
    })
}

function remove(req, res) {
    User.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            send.response200(res, data)
        } else {
            send.response404(res)
        }
    
    })
}

function update(req, res) {
    const usuario = ({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nombre_usuario: req.body.nombre_usuario,
        password: req.body.password,
        email: req.body.email,
        siguiendo: req.body.siguiendo
    })

    User.findByIdAndUpdate(req.params.id, { $set: usuario }, { new: true }, (err, data) => {
        if (!err) {
            send.response200(res, data)
        } else {
            send.response404(res)
        }
    })
}

module.exports = {
    users: (req, res) => users(req, res),
    user: (req, res) => user(req, res),
    create: (req, res) => create(req, res),
    remove: (req, res) => remove(req, res),
    update: (req, res) => update(req, res)
}