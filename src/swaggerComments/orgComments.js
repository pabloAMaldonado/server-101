/**
 * @swagger
 * /add-member-to-org:
 *   put:
 *     summary: Add a member to an organization
 *     tags:
 *       - Organizations
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
 *                   - emailToAdd
 *                   - org
 *                 properties:
 *                   emailToAdd:
 *                     type: string
 *                     description: The email of the user to add
 *                     example: usertoadd@example.com
 *                   org:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the organization
 *                         example: 60c72b2f5f1b2c001c8e4b1a
 *     responses:
 *       200:
 *         description: User added to the organization successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario agregado correctamente
 *                 data:
 *                   $ref: '#/components/schemas/Organization'
 *       400:
 *         description: User or organization not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No existe un usuario con ese correo
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
 * /new-proyect:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Organizations
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
 *                   - title
 *                   - deadline
 *                   - org
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The title of the project
 *                     example: New Project
 *                   deadline:
 *                     type: string
 *                     format: date
 *                     description: The deadline for the project
 *                     example: 2024-12-31
 *                   org:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the organization
 *                         example: 60c72b2f5f1b2c001c8e4b1a
 *     responses:
 *       200:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Proyecto creado correctamente
 *                 data:
 *                   $ref: '#/components/schemas/Proyect'
 *       400:
 *         description: Error selecting the organization
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
 * /give-role:
 *   put:
 *     summary: Assign admin role to a member in an organization
 *     tags:
 *       - Organizations
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
 *                   - user
 *                   - org
 *                   - isAdmin
 *                 properties:
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the user to be assigned admin role
 *                         example: 60c72b2f5f1b2c001c8e4b1a
 *                   org:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the organization
 *                         example: 60c72b2f5f1b2c001c8e4b1a
 *                   isAdmin:
 *                     type: boolean
 *                     description: Boolean flag to assign or remove admin role
 *                     example: true
 *     responses:
 *       200:
 *         description: Member credentials updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Miembro con credenciales actualizadas
 *                 data:
 *                   $ref: '#/components/schemas/Organization'
 *       400:
 *         description: Error selecting the organization
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
