const mongoose = require('mongoose')

const { Schema } = mongoose

const TaskSchema = ({
  name: { type: String, required: true },
  description: { type: String, require: true },
  for: { type: Schema.Types.ObjectId, ref: 'User' },
  madeBy: { type: Schema.Types.ObjectId, ref: 'User' },
  state: { type: String, default: 'Planeado' },
  deadline: { type: Date, required: true },
  messages: [{
    text: { type: String },
    by: { type: Schema.Types.ObjectId, ref: 'User' }
  }],

})

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task
