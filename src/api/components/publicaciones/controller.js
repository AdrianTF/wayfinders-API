const userPost = require('./model')

function posts(req, res) {
    userPost.find((error, data) => {
        if (!error) {
            res.send(data)
        } else {
            res.status(400).json({ code: 400, message: 'Error al mostrar el listado de publicaciones' })
        }
    })
}

function post(req, res) {
    userPost.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.status(400).json({ code: 400, message: 'Error al mostrar la publicación' })
        }
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
        usuario_id: req.body.usuario_id
    })

    publicacion.save((err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Usuario añadido con éxito', usuario: data })
        } else {
            res.status(400).json({ code: 400, message: 'Error al insertar el usuario', error: err })
        }
    })
}

function remove(req, res) {
    userPost.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Publicación borrada con éxito', post: data })
        } else {
            res.status(400).json({ code: 400, message: 'Error al borrar la publicación' })
        }
    })
}

function update(req, res) {
    const publicacion = ({
        nombre: req.body.nombre,
        cat: req.body.cat,
        km_distancia: req.body.km_distancia,
        dificultad: req.body.dificultad,
        min_duracion: req.body.min_duracion,
        contenido: req.body.contenido,
        usuario_id: req.body.usuario_id
    })

    userPost.findByIdAndUpdate(req.params.id, { $set: publicacion }, { new: true }, (err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Publicación modificada con éxito', post: data })
        } else {
            console.log(err)
            res.status(400).json({ code: 400, message: 'Error al modificar la publicación' })
        }
    })
}

module.exports = {
    posts: (req, res) => posts(req, res),
    post: (req, res) => post(req, res),
    create: (req, res) => create(req, res),
    remove: (req, res) => remove(req, res),
    update: (req, res) => update(req, res)
}