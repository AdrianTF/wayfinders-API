const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/', controller.users)
router.get('/:id', controller.user)
router.post('/', controller.create)
router.delete('/:id', controller.remove)
router.put('/:id', controller.update)

module.exports = router;