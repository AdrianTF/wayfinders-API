const send = require('../../utils/response')
const service = require('../../services/authService')


module.exports = (admin) => (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return send.response404(res) //Should be res 403
    }

    console.log("\nEl token: \n", token)
    token = token.substring(7);
    console.log("El token recortado:\n", token)
    let payload = service.verifyToken(token);
    console.log("\nResultado de la validación: ", payload)

    if (payload && payload.admin)
        next();
    else if (payload && (admin === payload.admin))
        next();
    else return send.response401(res)
};