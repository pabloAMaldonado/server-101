const mongoose = require('mongoose')

const { Schema } = mongoose

const OrganizationSchema = new Schema({
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'Free' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', admin: { type: Boolean, default: false }}],
    proyects: [{ type: Schema.Types.ObjectId, ref: 'Proyect'}]
})

module.exports = mongoose.model('Organization', OrganizationSchema)
