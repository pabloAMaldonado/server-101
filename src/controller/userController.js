const bcrypt = require('bcryptjs')
const util = require('util')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Organization = require('../models/organizationModel')

const { passport, generateToken, authenticateToken } = require('../configuration/passportConfig')
const { user_right_permit } = require('../controller/functions/userManagment')

exports.new_User = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body

  const user = await User.findOne({ email })

  if (user) return res.status(400).json({ error: 'User email already used' })

  try {
    const passwordValidator = (value) => {
      if (!/[A-Z]/.test(value)) {
        throw new Error('Password must contain at least one uppercase letter')
      }
      return true
    }

    passwordValidator(password)

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      password: hashedPassword,
      username
    })

    await newUser.save()

    res.status(200).json({ message: 'User created successfully', data: newUser })
    next()
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})

exports.login_User = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', async (err, user) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(400).json({ error: 'Auth Error!', user })
    }
    try {
      const user_token = generateToken(user)
      return res.status(200).send({ message: 'Inicio de sesión exitoso', user_token, user })
    }
    catch (error) {
      return next(error)
    }
  })(req, res, next)
})
  
exports.user_Info = [
  authenticateToken, 
  asyncHandler(async (req, res) => {
    const { user } = req

    try {
      const user_info = await User.findById(user._id)

      if (!user_info) {
        return res.status(400).json({ error: 'No data found' });
      }

      return res.status(200).json({ message: 'Data found', data: user_info })
    }
    catch (error){
    return res.status(500).json({ error, message: 'Internal error'})
    }
  })
]

exports.create_org = [
  authenticateToken,
  asyncHandler(async (req, res) => {
    const { user } = req
    const { formData } = req.body
    try {
      const org = await Organization.findOne({ name: formData.name, createdBy: user._id })

      if (org) {
        return res.status(400).json({ message: 'You have an org with the same name' })
      }

      const new_org = new Organization({
        name: formData.name,
        createdBy: user._id
      })

      await new_org.save()

      return res.status(200).json({ message: 'Organization created succefully', data: new_org.id})
    } catch (error) {
      console.error('Error creating organization:', error)
      return res.status(500).json({ message: 'Internal error', error })
    }
  })
]

exports.add_member_to_org = [
  user_right_permit,
  asyncHandler(async (req, res) => {
    const { formData } = req.body

    console.log(formData)

    try {
      const userToAdd = await User.findOne({ email: formData.emailToAdd })

      if (!userToAdd) {
        return res.status(400).json({ message: 'No existe un usuario con ese correo' })
      }

      const org = await Organization.findByIdAndUpdate(formData.org._id, { $addToSet: { members: userToAdd._id } }, { new: true }).populate('members')

      if (!org) {
        return res.status(400).json({ message: 'Organización no encontrada' });
      }

      return res.status(200).json({message: 'Usuario agregado correctamente', data: org })
    } catch (error) {
      return res.status(500).json({ message: 'Internal error', error })
    }
  })
]