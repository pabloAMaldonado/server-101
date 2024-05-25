const asyncHandler = require('express-async-handler')
const { authenticateToken } = require('../../configuration/passportConfig')

const User = require('../../models/userModel')
const Organization = require('../../models/organizationModel')

exports.user_right_permit = [
    authenticateToken,
    asyncHandler(async (req, res, next) => {
        const { user } = req
        const { formData } = req.body

        try {
            const org = await Organization.findById(formData.org._id);
      
            if (!org) {
              return res.status(403).json({ message: 'Organization not found' });
            }

            const isCreator = org.createdBy.equals(user._id);
            const isMember = org.members.some(member => member.user.equals(user._id));
      
            if (!isCreator && !isMember) {
              return res.status(404).json({ message: 'Access denied' });
            }

            next();
          } catch (error) {
            return res.status(501).json({ message: 'Internal server error', error });
          }
    })
]