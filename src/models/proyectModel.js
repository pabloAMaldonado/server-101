const mongoose = require('mongoose')

const { Schema } = mongoose

const projectSchema = new Schema({
  labels: [{ type: String, required: true }],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    member: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deadline: { type: Date, required: true },
    messages: [{
      text: { type: String },
      by: { type: Schema.Types.ObjectId, ref: 'User' }
    }]
  }],
  createdAt: { type: Date, default: Date.now },
  deadline: { type: Date, required: true }
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
