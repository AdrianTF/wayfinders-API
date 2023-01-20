const jwt = require('jsonwebtoken')

let generateToken = (user, admin) => {
    return jwt.sign({ user: user, admin: admin }, process.env.TOKEN_SECRET, { expiresIn: "365d" });
}

let verifyToken = (token) => {
    let payload = jwt.verify(token, process.env.TOKEN_SECRET);
    return payload;
}

module.exports = {
    generateToken,
    verifyToken
}