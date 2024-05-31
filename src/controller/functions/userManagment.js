const asyncHandler = require('express-async-handler')

const Organization = require('../../models/organizationModel')

exports.verify_permissions = (requiredPermissions) => {
  return asyncHandler(async (req, res, next) => {
    const { user } = req
    const { formData } = req.body

    try {
      const org = await Organization.findById(formData.org._id)

      if (!org) {
        return res.status(403).json({ message: 'Organization not found' })
      }

      const isMember = org.members.some(member => member._id.equals(user._id))
      const isAdmin = org.members.some(member => member._id.equals(user._id) && member.admin)
      const isCreator = org.createdBy.equals(user._id)


      if (requiredPermissions === 'admin' && !isAdmin && !isCreator) {
        return res.status(403).json({ message: 'Admin rights required' })
      }

      if (requiredPermissions === 'ceo' && !isCreator) {
        return res.status(403).json({ message: 'CEO rights required' })
      }

      if (!isMember && !isAdmin && !isCreator) {
        return res.status(404).json({ message: 'Access denied' })
      }

      next()
    } catch (error) {
      console.error('Error in verify_permissions middleware:', error)
      return res.status(500).json({ message: 'Internal server error', error })
    }
  })
}
