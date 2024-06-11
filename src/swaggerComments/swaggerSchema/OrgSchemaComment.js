/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The user ID of the member
 *           example: 60c72b2f5f1b2c001c8e4b1a
 *         admin:
 *           type: boolean
 *           description: Indicates if the member is an admin of the organization
 *           example: false
 *
 *     Organization:
 *       type: object
 *       required:
 *         - name
 *         - createdBy
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the organization
 *           example: 60c72b2f5f1b2c001c8e4b1b
 *         name:
 *           type: string
 *           description: The name of the organization
 *           example: My Organization
 *         createdBy:
 *           type: string
 *           description: The user ID of the user who created the organization
 *           example: 60c72b2f5f1b2c001c8e4b1a
 *         status:
 *           type: string
 *           description: The status of the organization
 *           example: Free
 *         members:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Member'
 *           description: Array of members in the organization
 *         projects:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of project IDs associated with the organization
 */

module.exports = {}
