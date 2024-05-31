
/**
 * @swagger
 * /new-user:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided email, username, and password. The password must contain at least one uppercase letter.
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: user@example.com
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: newuser
 *               password:
 *                 type: string
 *                 description: The password of the user. Must contain at least one uppercase letter.
 *                 example: Passw0rd
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: User email already used
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User email already used
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: Passw0rd
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inicio de sesión exitoso
 *                 user_token:
 *                   type: string
 *                   description: JWT token
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Authentication error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Auth Error!
 */

/**
 * @swagger
 * /user-info:
 *   get:
 *     summary: Get user information
 *     description: Retrieves information for the authenticated user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data found
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: No data found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No data found
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal error
 */

/**
 * @swagger
 * /new-org:
 *   post:
 *     summary: Create a new organization
 *     description: Creates a new organization for the authenticated user
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
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the organization
 *                     example: My Organization
 *             required:
 *               - formData
 *     responses:
 *       200:
 *         description: Organization created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Organization created successfully
 *                 data:
 *                   type: string
 *                   example: 1234567890abcdef
 *       400:
 *         description: User already has an organization with the same name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You have an organization with the same name
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
 */

/**
 * @swagger
 * /add-member-to-org:
 *   post:
 *     summary: Add a member to an organization
 *     description: Adds a member to an organization
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
 *                 properties:
 *                   emailToAdd:
 *                     type: string
 *                     description: The email of the user to add to the organization
 *                     example: user@example.com
 *                   org:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the organization
 *                         example: 1234567890abcdef
 *             required:
 *               - formData
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
 */

/**
 * @swagger
 * /new-proyect:
 *   post:
 *     summary: Crea un nuevo proyecto
 *     tags:
 *       - Proyectos
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
 *                     example: Proyecto Test
 *                   deadline:
 *                     type: string
 *                     format: date
 *                     example: 2024-12-31
 *                   org:
 *                     type: object
 *                     required:
 *                       - _id
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66561556e9e3eea9ca02a64a
 *     responses:
 *       200:
 *         description: Proyecto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Proyecto creado correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66561556e9e3eea9ca02a64b
 *                     title:
 *                       type: string
 *                       example: Proyecto Test
 *                     deadline:
 *                       type: string
 *                       format: date
 *                       example: 2024-12-31
 *                     by:
 *                       type: string
 *                       example: 66561556e9e3eea9ca02a648
 *       400:
 *         description: Error, al seleccionar la organización
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error, al seleccionar la organización
 *       500:
 *         description: Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal error
 *                 error:
 *                   type: object
 */
