const nodemailer = require('nodemailer')

const { orgMail, orgPassword } = process.env

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

exports.module = transporter
