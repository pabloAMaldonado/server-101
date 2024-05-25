const express = require('express')

const router = express.Router()

const IndexController = require('../controller/indexController')
const UserController = require('../controller/userController')

router
  .get('/index', IndexController.homepage)
  .post('/new-user', UserController.new_User)
  .post('/login', UserController.login_User)
  .post('/new-org', UserController.create_org)
  .put('/add-member-to-org', UserController.add_member_to_org)
  
module.exports = router
