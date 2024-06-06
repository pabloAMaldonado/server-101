const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Organization = require('../models/organizationModel')
const Proyect = require('../models/proyectModel')
const Task = require('../models/taskModel')

const { passport, generateToken, authenticateToken } = require('../configuration/passportConfig')
const { verify_permissions } = require('../controller/functions/userManagment')

exports.new_task = [
    authenticateToken,
    verify_permissions('admin'),
    asyncHandler(async (req, res) => {
      const { formData } = req.body   
      const { user } = req

      try{ 
        const org = await Organization.findById(formData.org._id)

        if (!org) return res.status(400).json({ message: 'Error, al seleccionar la organizacion'})

        let proyect = await Proyect.findById(formData.proyect._id)

        if (!proyect) return res.status(400).json({ message: 'Error, al seleccionar el proyecto'})


        const newTask = new Task({
          name: formData.name,
          description: formData.description,
          madeBy: user._id,
          deadline: formData.deadline,
        })

        await newTask.save()

        proyect = await Proyect.findByIdAndUpdate(
          formData.proyect._id,
          { $push: { tasks: newTask._id } },
          { new: true }
        )

        if (!proyect) return res.status(400).json({ message: 'Error, al seleccionar el proyecto'})

        return res.status(200).json({ message: 'Tarea creada y agregada exitosamente', data: newTask })
      } catch(error) {
        console.error('Error new_task controller', error)
      }
    })
  ]
