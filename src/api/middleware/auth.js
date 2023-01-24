const send = require('../../utils/response')
const service = require('../../services/authService')


module.exports = (admin) => (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return send.response403(res) 
    }
    
    token = token.substring(7);
    let payload = service.verifyToken(token);
    if (payload && payload.admin)
        next();
    else if (payload && (admin === payload.admin))
        next();
    else return send.response401(res)
};