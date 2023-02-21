const jwt = require('jsonwebtoken');
const config = require('../config/config');


let generateToken = (user, admin) => {
    return jwt.sign({ user: user, admin: admin }, process.env.TOKEN_SECRET, { expiresIn: config.TOKEN_TIMESPAN });
}

let verifyToken = (token) => {
    let payload = jwt.verify(token, process.env.TOKEN_SECRET);
    return payload;
}

module.exports = {
    generateToken,
    verifyToken
}