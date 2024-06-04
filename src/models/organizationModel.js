const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  admin: { type: Boolean, default: false }
}, { _id: false })

const OrganizationSchema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Free' },
  members: [MemberSchema],
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
})

module.exports = mongoose.model('Organization', OrganizationSchema)