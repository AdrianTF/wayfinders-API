const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');

exports.createToken = function (user) {
  console.log(user)
  let payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return jwt.sign(payload, config.TOKEN_SECRET);
};