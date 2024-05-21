const express = require('express')

const router = express.Router()

const IndexController = require('../controller/indexController')
const UserController = require('../controller/userController')

router
  .get('/index', IndexController.homepage)
  .post('/new-user', UserController.new_User)

module.exports = router
