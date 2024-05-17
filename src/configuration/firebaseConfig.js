const admin = require('firebase-admin')
const serviceAccount = require()// to set up

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: ''// to add up
})

const bucket = admin.storage().bucket()

module.exports = bucket
