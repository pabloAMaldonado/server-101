const express = require('express')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

dotenv.config()

const app = express()

mongoose.set('strictQuery', false)
const DB = process.env.DB

async function connectToDatabase (db) {
  try {
    await mongoose.connect(db, {})
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}

connectToDatabase(DB)

const dataBase = mongoose.connection

dataBase.on('error', console.error.bind(console, 'MongoDB connection error'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret',
  cookie: { maxAge: 3600000 },
  saveUninitialized: false,
  resave: false
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

const routes = require('./src/routes/indexRoute')

app.use('/', routes)

const PORT = process.env.PORT || 3000
const { swaggerDocs } = require('./src/configuration/swaggerConfig')

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
    console.log(`http://localhost:${PORT}`)
    swaggerDocs(app)
  })
}

module.exports = app
