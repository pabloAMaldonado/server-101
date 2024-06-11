const express = require('express')

const router = express.Router()

const IndexController = require('../controller/indexController')
const UserController = require('../controller/userController')
const OrganizationController = require('../controller/orgController')
const ProyectController = require('../controller/proyectController')

router
  // USER
  .post('/new-user', UserController.new_User)
  .post('/login', UserController.login_User)
  .get('/user-info', UserController.user_Info)
  .post('/new-org', UserController.create_org)

  // ORG
  .put('/add-member-to-org', OrganizationController.add_member_to_org)
  .put('/give-role', OrganizationController.give_admin)
  .post('/new-proyect', OrganizationController.new_proyect)

  // PROYECT
  .post('/new-task', ProyectController.new_task)
  .put('/assign-task', ProyectController.assign_task)

  // SERVER HTML
  .get('/index', IndexController.homepage)
  

module.exports = router
