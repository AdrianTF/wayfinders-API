const express = require('express')
const controller = require('./controller')
const validator = require('../../middleware/validator')
const auth = require('../../middleware/auth')

const router = express.Router()

router.get('/', [auth(false)], controller.posts)
router.get('/:id', [auth(false)], controller.post)
router.post('/', [validator.post(), auth(false)], controller.create)
router.delete('/:id', controller.remove)
router.put('/:id', controller.update)

module.exports = router;