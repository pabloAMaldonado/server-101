const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const { passport, generateToken, authenticateToken } = require('../configuration/passportConfig')

exports.new_User = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.findOne({ email })

  if (user) return res.status(400).json({ error: 'User email already used' })

  try {
    const newUser = new User({
      email,
      password: hashedPassword,
      username
    })

    await newUser.save()

    res.status(200).json({ message: 'User created successfully' })
    next()
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})
