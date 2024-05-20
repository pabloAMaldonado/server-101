const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv')
const User = require('../models/userModel')
const transporter = require('../../configuration/nodemailerConfig')

dotenv.config()

const { orgMail, webUrl } = process.env

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
