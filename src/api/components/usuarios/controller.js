const User = require('./model')

function users(req, res) {
    res.send('Buenas tardes')
}

function user(req, res) {
    let id = req.params.id
    res.send(`Usuario con ${id}`)
}

function create(req, res) {
    const usuario = new User({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nombre_usuario: req.body.nombre_usuario,
        password: req.body.password,
        email: req.body.email,
        siguiendo: []
    })

    usuario.save((err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Usuario añadido con éxito', usuario: data })
        } else {
            res.status(400).json({ code: 400, message: 'Error al insertar el usuario' })
            console.log(err)
        }
    })
}

module.exports = {
    users: (req, res) => users(req, res),
    user: (req, res) => user(req, res),
    create: (req, res) => create(req, res)
}