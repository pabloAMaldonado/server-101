const { initializeApp } = require('firebase/app')
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage')
const multer = require('multer')

const FirebaseConfig = require('../../configuration/firebaseConfig')

initializeApp(FirebaseConfig)

const storage = getStorage()

const upload = multer({ storage: multer.memoryStorage() })

const uploadFile = [
  upload.single('filename'),
  async (req, res) => {
    try {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
      const fileType = req.file.mimetype

      if (!allowedTypes.includes(fileType)) {
        return res.status(400).send({ message: 'Solo se permiten archivos de imágenes y PDFs.' })
      }

      const dateTime = giveCurrentDateTime()

      const storageRef = ref(storage, `files/${req.file.originalname + ' ' + dateTime}`)

      const metadata = {
        contentType: req.file.mimetype
      }

      const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)

      const downloadURL = await getDownloadURL(snapshot.ref)

      req.fileUrl = downloadURL

      console.log('File successfully uploaded.')
      return res.send({
        message: 'file uploaded to firebase storage',
        name: req.file.originalname,
        type: req.file.mimetype,
        downloadURL
      })
    } catch (error) {
      return res.status(400).send(error.message)
    }
  }
]

const giveCurrentDateTime = () => {
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  const dateTime = date + ' ' + time
  return dateTime
}

module.exports = uploadFile
