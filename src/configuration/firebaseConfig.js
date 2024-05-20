const dotenv = require('dotenv')

dotenv.config()

const FirebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGINGI_SENDER_ID,
  appId: process.env.APP_ID_FIREBASE,
  measurementId: process.env.MEASUREMENT_ID
}

module.exports = FirebaseConfig
