const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

async function initializeMongoServer () {
  if (mongoose.connection.readyState === 0) {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()

    console.log(`MongoMemoryServer URI: ${mongoUri}`) 

    await mongoose.connect(mongoUri, {})

    mongoose.connection.on('error', e => {
      if (e.message.code === 'ETIMEDOUT') {
        console.log(e)
        mongoose.connect(mongoUri)
      }
      console.log(e)
    })

    mongoose.connection.once('open', () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`)
    })
  }
}

async function closeMongoServer () {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
    if (mongoServer) {
      await mongoServer.stop()
    }
  }
}

module.exports = { initializeMongoServer, closeMongoServer }
