const Index = require('../models/indexModel')
const asyncHandler = require('express-async-handler')

exports.getIndex = asyncHandler(async (req, res, next) => {
  const index = await Index.find()

  if (index === null) {
    const err = new Error('no Index found')
    err.status = 404
    return next(err)
  }
  return res.status(200).send({ message: 'Informacion entregada correctamente', index })
})
