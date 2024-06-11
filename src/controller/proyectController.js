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
        return res.status(500).json({ error, message: 'Error al crear una nueva tarea' })
      }
    })
  ]

  exports.assign_task = [
    authenticateToken,
    verify_permissions('admin'),
    asyncHandler(async (req, res) => {
      const { formData } = req.body

      const org = await Organization.findById(formData.org._id)

      if (!org) {
        return res.status(400).json({ message: 'Error, al buscar la organizacion' })
      }

      const proyect = await Proyect.findById(formData.proyect._id)

      if (!proyect) {
        return res.status(400).json({ message: 'Error, proyecto no encontrado' })
    }

      const task = await Task.findById(formData.task._id)

      if (!task) {
        return res.status(400).json({ message: 'Error, al buscar la tarea' })
    }

      if (task.madeBy.toString() !== req.user._id.toString() && org.createdBy.toString() !== req.user._id.toString()) {
        return res.status(400).json({ message: 'Error, Usuario sin permisos' })
      }

      try {
        const task_upd = await Task.findByIdAndUpdate(
          formData.task._id,
          { $set: { for: formData.user._id } },
          { new: true }
          )

          if (!task) {
            console.log(5)
            return res.status(400).json({ message: 'Error, al buscar la tarea' })
        }

          return res.status(200).json({ message: 'Asignacion de tarea correcta', data: task_upd })
      } catch (error) {
        return res.status(500).json({ error, message: 'Error al asignar la tarea' })
      }
    })
  ]
