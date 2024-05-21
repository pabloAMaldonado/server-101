const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

exports.homepage = asyncHandler(async (req, res, next) => {
  const [userTotal, userList, usersPending] = await Promise.all([
    User.countDocuments({ verified: 'True' }).exec(),
    User.find({ verified: 'True' }).exec(),
    User.countDocuments({ verified: 'Pending' }).exec()
  ])

  res.render('index', {
    title: 'Server EcoProyectos NoSQL',
    user_count: userTotal,
    user_list: userList,
    user_pending: usersPending
  })
})
