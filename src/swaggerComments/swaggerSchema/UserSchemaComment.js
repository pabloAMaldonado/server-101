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
 *           description: The user's email
 *           example: user@example.com
 *         password:
 *           type: string
 *           description: The user's password, must contain at least one uppercase letter and be at least 8 characters long
 *           example: Passw0rd
 *         username:
 *           type: string
 *           description: The user's username
 *           example: newuser
 *       description: Schema for user details
 */

const UserSchema = {
    type: 'object',
    required: ['email', 'password', 'username'],
    properties: {
      email: {
        type: 'string',
        description: "The user's email",
        example: 'user@example.com'
      },
      password: {
        type: 'string',
        description: "The user's password, must contain at least one uppercase letter and be at least 8 characters long",
        example: 'Passw0rd'
      },
      username: {
        type: 'string',
        description: "The user's username",
        example: 'newuser'
      }
    },
    description: 'Schema for user details'
  }
  
  module.exports = UserSchema
