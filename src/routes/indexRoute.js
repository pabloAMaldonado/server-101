const express = require('express')

const router = express.Router()

const IndexController = require('../controller/indexController')
const UserController = require('../controller/userController')
const OrganizationController = require('../controller/orgController')

router
  .get('/index', IndexController.homepage)
  .post('/new-proyect', OrganizationController.new_proyect)
  .put('/add-member-to-org', OrganizationController.add_member_to_org)
  .put('/give-role', OrganizationController.give_admin)
  .post('/new-user', UserController.new_User)
  .post('/login', UserController.login_User)
  .get('/user-info', UserController.user_Info)
  .post('/new-org', UserController.create_org)

  

module.exports = router
