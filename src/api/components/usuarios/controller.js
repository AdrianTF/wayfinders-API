const User = require('./model')

function users(req, res) {
    User.find((error, data) => {
        if (!error) {
            res.send(data)
        } else {
            res.status(400).json({ code: 400, message: 'Error al mostrar el listado de usuarios' })
        }
    })
}

function user(req, res) {
    User.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.status(400).json({ code: 400, message: 'Error al mostrar el usuario' })
        }
    })
}

function create(req, res) {
    const usuario = new User({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nombre_usuario: req.body.nombre_usuario,
        password: req.body.password,
        email: req.body.email,
        siguiendo: req.body.siguiendo
    })

    usuario.save((err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Usuario añadido con éxito', usuario: data })
        } else {
            res.status(400).json({ code: 400, message: 'Error al insertar el usuario' })
        }
    })
}

function remove(req, res) {
    User.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Usuario borrado con éxito', usuario: data })
        } else {
            res.status(400).json({ code: 400, message: 'Error al borrar el usuario' })
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

    User.findByIdAndUpdate(req.params.id, { $set: usuario}, { new: true }, (err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Usuario modificado con éxito', usuario: data })
        } else {
            console.log(err)
            res.status(400).json({ code: 400, message: 'Error al modificar el usuario' })
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