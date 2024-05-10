const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const User = require('../model/userModel')

dotenv.config()

const { jwtTokenSecret } = process.env

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      console.log('correo electronico:', email)
      console.log('Contraseña recibida:', password)
      const user = await User.findOne({ email })
      console.log(user)
      if (!user) {
        console.log(user, 1)
        return done(null, false, { message: 'Incorrect email', user })
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        console.log(user, 2)
        return done(null, false, { message: 'Incorrect password', user })
      }
      if (!user.verified) {
        console.log(user)
        return done(null, false, { message: 'User not verified', user })
      }
      console.log(user, 3)
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtTokenSecret
}, (jwtPayload, done) => done(null, jwtPayload)))

function generateToken (prop) {
  return jwt.sign({ prop }, jwtTokenSecret, { expiresIn: '1h' })
}

function authenticateToken (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  jwt.verify(token, jwtTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no valido' })
    }
    req.user = user
    return req.user
  })
  return next()
}

module.exports = {
  passport,
  generateToken,
  authenticateToken
}
