const express = require('express')
const controller = require('./controller')
const auth = require('../../middleware/auth')
const validator = require('../../middleware/validator')

const router = express.Router()

router.get('/', /*[auth(false)],*/ controller.users)
router.get('/:id', controller.user)
router.post('/', [validator.user()], controller.create)
router.delete('/:id', controller.remove)
router.put('/:id', controller.update)

module.exports = router;