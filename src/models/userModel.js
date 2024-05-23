const mongoose = require('mongoose')

const { Schema } = mongoose

const passwordValidator = (value) => {
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(value)) {
    throw new Error('Password must contain at least one uppercase letter')
  }
  return true
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    validate: [passwordValidator, 'Password validation failed, It s need at least a mayus character and a symbol']
  },
  username: {
    type: String,
    minlength: 4,
    required: true
  },
})

module.exports = mongoose.model('User', UserSchema)
