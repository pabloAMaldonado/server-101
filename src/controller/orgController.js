const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Organization = require('../models/organizationModel')
const Proyect = require('../models/proyectModel')

const { passport, generateToken, authenticateToken } = require('../configuration/passportConfig')
const { verify_permissions } = require('../controller/functions/userManagment')

exports.add_member_to_org = [
    authenticateToken,
    verify_permissions('admin'),
    asyncHandler(async (req, res) => {
      const { formData } = req.body
  
      try {
        const userToAdd = await User.findOne({ email: formData.emailToAdd })
  
        if (!userToAdd) {
          return res.status(400).json({ message: 'No existe un usuario con ese correo' })
        }
        const org = await Organization.findByIdAndUpdate(formData.org._id,
          { $push: { members: { user: userToAdd._id, admin: false } } },
          { new: true })

        if (!org) {
          return res.status(400).json({ message: 'Organización no encontrada' });
        }
  
        return res.status(200).json({message: 'Usuario agregado correctamente', data: org })
      } catch (error) {
        console.error('error add member to org', error)
        return res.status(500).json({ message: 'Internal error', error })
      }
    })
  ]
  
  exports.new_proyect = [
    authenticateToken,
    verify_permissions('admin'),
    asyncHandler(async (req, res) => {
      const { formData } = req.body
      const { user } = req
      try {
        const org = await Organization.findById(formData.org._id)
  
        if (!org) return res.status(400).json({ message: 'Error, al seleccionar la organizacion'})
  
        const newProyect = new Proyect({
          title: formData.title,
          deadline: formData.deadline,
          by: user._id
        })
  
        await newProyect.save()
  
        res.status(200).json({ message: 'Proyecto creado correctamente', data: newProyect})
      } catch (error) {
        res.status(500).json({ message: 'Internal error', error})
      }
    })
  ]
  
  exports.give_admin = [
    authenticateToken,
    verify_permissions('ceo'),
    asyncHandler(async (req, res) => {
      const { formData } = req.body

      try {
        const org = await Organization.findById(formData.org._id)

        if (!org) return res.status(400).json({ message: 'Error, al seleccionar la organizacion'})

        const memberIndex = org.members.findIndex(member => member.user.toString() === formData.user._id);

        if (memberIndex !== -1) {
          org.members[memberIndex].admin = formData.isAdmin;
        }

        await org.save()

        res.status(200).json({ message: 'Miembro con credenciales actualizadas', data: org})
      }
      catch (error) {
        console.error('ERROR', error)
        res.status(500).json({ message: 'Internal error', error})
      }
    })
  ]