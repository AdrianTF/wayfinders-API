const User = require('../usuarios/model')
const send = require('../../../utils/response')
const service = require('../../../services/authService')
const moment = require('moment')
const bcrypt = require('bcrypt')


function login(req, res) {
    //Validations with joi here

    User.findOne({ _id: req.body._id }, (err, user) => {
        if (err) {
            return send.response500(res)
        }
        if (!user) {
            return send.response404(res)
        }

        const isValidPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!isValidPassword)
            return send.response404(res) //Should give more info about error.

        const token = service.generateToken(user._id, user.admin)
        send.response200(res, token)
    });
}

function register(req, res) {
    //TODO joi validations

    let hashedPassword = bcrypt.hashSync(req.body.password, Number(process.env.SALT))

    const usuario = new User({
        _id: req.body._id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        password: hashedPassword,
        email: req.body.email,
        siguiendo: req.body.siguiendo,
        hora: moment().format('HH:mm:ss').toString(),
        fecha: moment().format('DD/MM/YYYY').toString()
    })

    const token = service.generateToken(usuario._id, usuario.admin)

    usuario.save((err, data) => {
        if (!err) {
            send.response201(res, token)
        } else {
            send.response404(res)
        }
    })
}


module.exports = {
    login: (req, res) => login(req, res),
    register: (req, res) => register(req, res)
}