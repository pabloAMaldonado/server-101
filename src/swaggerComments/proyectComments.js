/**
 * @swagger
 * /new-task:
 *   post:
 *     summary: Create a new task and add it to a project
 *     tags:
 *       - Proyects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               formData:
 *                 type: object
 *                 required:
 *                   - name
 *                   - description
 *                   - deadline
 *                   - org
 *                   - proyect
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the task
 *                     example: New Task
 *                   description:
 *                     type: string
 *                     description: The description of the task
 *                     example: Task description here
 *                   deadline:
 *                     type: string
 *                     format: date
 *                     description: The deadline for the task
 *                     example: 2024-12-31
 *                   org:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the organization
 *                         example: 60c72b2f5f1b2c001c8e4b1a
 *                   proyect:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the project
 *                         example: 60c72b2f5f1b2c001c8e4b1b
 *     responses:
 *       200:
 *         description: Task created and added to the project successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea creada y agregada exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error selecting the organization or project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error, al seleccionar la organizacion
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal error
 *                 error:
 *                   type: string
 *                   example: Detailed error message
 */

/**
 * @swagger
 * /assign-task:
 *   put:
 *     summary: Assign a task to a user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               formData:
 *                 type: object
 *                 properties:
 *                   org:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b5a37d8f3f4c6d88e4c6d2"
 *                   proyect:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b5a37d8f3f4c6d88e4c6d3"
 *                   task:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b5a37d8f3f4c6d88e4c6d4"
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b5a37d8f3f4c6d88e4c6d5"
 *     responses:
 *       200:
 *         description: Task successfully assigned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Asignacion de tarea correcta
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error, project or task not found / Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error, al buscar la organizacion
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al asignar la tarea
 *                 error:
 *                   type: object
 */
