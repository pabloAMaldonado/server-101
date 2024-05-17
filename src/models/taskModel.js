const mongoose = require('mongoose')

const { Schema } = mongoose

const TaskSchema = ({
  description: { type: String, require: true },
  for: { type: Schema.Types.ObjectId, ref: 'User' },
  madeBy: { type: Schema.Types.ObjectId, ref: 'User' },
  state: { type: String, default: 'Planeado' }
})

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task
