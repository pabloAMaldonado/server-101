const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const {
  orgMail, orgPassword, webUrl
} = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  hots: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: orgMail,
    pass: orgPassword
  }
})

exports.sendVerification = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).send('Usuario no encontrado')
  }

  const { verification } = user

  const mailOption = {
    from: {
      name: 'EcoProyectos Inc',
      address: orgMail
    },
    to: email,
    subject: 'Verificacion de cuenta, EcoProyectos',
    text:
          `Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico: ${webUrl}user/${verification}`
  }

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      return res.status(400).send({ message: 'Error al enviar correo de verificacion', error })
    }
    return res.status(200).send({ message: 'Cuenta creada, Correo de verificacion enviado correctamente', info })
  })
})
