const express = require('express')
const controller = require('./controller')
const validator = require('../../middleware/validator')

const router = express.Router()

router.post('/login', controller.login)
router.post('/register', [validator.user()], controller.register)

module.exports = router;