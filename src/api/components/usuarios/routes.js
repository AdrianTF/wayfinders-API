const express = require('express')
const controller = require('./controller')
const auth = require('../../middleware/auth')
const validator = require('../../middleware/validator')

const router = express.Router()

router.get('/', [auth(false)], controller.users)
router.get('/:id', [auth(false)], controller.user)
router.post('/', [validator.requiredUser()], controller.create)
router.delete('/:id', controller.remove)
router.put('/:id', [validator.user(), auth(false)], controller.update)
router.put('/follow/:id', [auth(false)], controller.follow)
router.put('/unfollow/:id', [auth(false)], controller.unfollow)

module.exports = router;