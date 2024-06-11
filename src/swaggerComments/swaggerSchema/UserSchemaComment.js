/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email address
 *           example: user@example.com
 *         password:
 *           type: string
 *           description: The user's password. Must be at least 8 characters long and contain at least one uppercase letter
 *           example: Passw0rd!
 *         username:
 *           type: string
 *           description: The user's username
 *           example: johndoe
 *         verified:
 *           type: string
 *           description: The verification status of the user
 *           default: Pending
 *           example: Pending
 */

module.exports = {}
