const express = require('express')

const router = express.Router()

const IndexController = require('../controller/indexController')

router
  .get('./index', IndexController.getIndex)

module.exports = router
