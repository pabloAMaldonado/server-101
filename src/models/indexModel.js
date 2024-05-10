const mongoose = require('mongoose')

const { Schema } = mongoose

const IndexSchema = new Schema({})

module.exports = mongoose.model('Index', IndexSchema)
