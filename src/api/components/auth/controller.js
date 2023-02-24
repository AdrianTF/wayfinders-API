const User = require('../usuarios/model')
const send = require('../../../utils/response')
const service = require('../../../services/authService')
const moment = require('moment')
const bcrypt = require('bcrypt')
const log = require('../../../utils/log')


function login(req, res) {
    User.findOne({ _id: req.body._id }, (error, user) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        if (!user) {
            return send.response404(res)
        }

        const isValidPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!isValidPassword) {
            console.log('Contraseña incorrecta');
            return send.response401(res)
        }

        const token = service.generateToken(user._id, user.admin)
        send.response200(res, token)
    });
}

function register(req, res) {
    let hashedPassword = bcrypt.hashSync(req.body.password, Number(process.env.SALT))

    const usuario = new User({
        _id: req.body._id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        password: hashedPassword,
        email: req.body.email,
        siguiendo: [],
        hora: moment().format('HH:mm:ss').toString(),
        fecha: moment().format('DD/MM/YYYY').toString()
    })

    const token = service.generateToken(usuario._id, usuario.admin)

    usuario.save((error, data) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        if (!data) {
            return send.response404(res)
        }
        send.response201(res, token)
    })
}

function accountLockingLogin(req, res) {
    const MAX_LOGIN_ATTEMPTS = 3
    const LOCK_TIME = 0.5 * 60 * 1000
    let currentTime = Date.now()

    User.findOne({ _id: req.body._id }, (error, user) => {
        if (error) {
            log.write(error)
            return send.response500(res)
        }
        if (!user) {
            return send.response404(res)
        }

        isLocked = user.lockUntil && user.lockUntil > currentTime
        hasLockExpired = user.lockUntil && user.lockUntil < currentTime
        loginAttempts = user.loginAttempts

        if (isLocked) return send.response401(res)

        if (hasLockExpired) {
            const update = {
                $set: { loginAttempts: 0 },
                $unset: { lockUntil: 1 }
            }

            User.updateOne({ _id: req.body._id }, update, (error, data) => {
                if (error) {
                    log.write(error)
                    return send.response500(res)
                }
                loginAttempts = 0
            })
        }

        const isValidPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!isValidPassword) {
            let updates = {
                $inc: { loginAttemtps: 1 }
            }
            if (loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS) {
                updates.$set = { lockUntil: Date.now + LOCK_TIME }
            }
            User.updateOne({ _id: req.body._id }, updates, (error, data) => {
                if (error) {
                    log.write(error)
                    return send.response500(res)
                }
                console.log('Contraseña incorrecta');
                return send.response401(res)
            })
        }
        if (loginAttempts > 0) {
            let updates = {
                $set: { loginAttemtps: 0 },
                $unset: { lockUntil: 1 }

            }
            User.updateOne({ _id: req.body._id }, updates, (error, data) => {
                if (error) {
                    log.write(error)
                    return send.response500(res)
                }
            })
        }
        const token = service.generateToken(user._id, user.admin)
        send.response200(res, token)
    });
}



module.exports = {
    login: (req, res) => login(req, res),
    register: (req, res) => register(req, res)
}