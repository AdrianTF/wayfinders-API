const express = require('express')
const controller = require('./controller')
const auth = require('../../middleware/auth')
const validator = require('../../middleware/validator')

const router = express.Router()

router.get('/', /*[auth(false)],*/ controller.users)
router.get('/:id', controller.user)
router.post('/', [validator.requiredUser()], controller.create)
router.delete('/:id', controller.remove)
router.put('/:id',[validator.user()], controller.update)

module.exports = router;