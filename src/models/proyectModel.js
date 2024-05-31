const mongoose = require('mongoose')

const { Schema } = mongoose

const projectSchema = new Schema({
  title: { type: String, required: true },
  by: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  createdAt: { type: Date, default: Date.now },
  deadline: { type: Date, required: true },
  budget: [{ type: Schema.Types.ObjectId, ref: 'Budget' }]
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
