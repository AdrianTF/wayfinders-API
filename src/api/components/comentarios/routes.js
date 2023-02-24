const express = require('express')
const controller = require('./controller')
const validator = require('../../middleware/validator')
const auth = require('../../middleware/auth')

const router = express.Router()

router.get('/', [auth(false)], controller.comments)
router.get('/:id', [auth(false)], controller.comment)
router.post('/', [validator.comment(), auth(true)], controller.create)
router.delete('/:id', controller.remove)
router.put('/:id', controller.update)

module.exports = router;