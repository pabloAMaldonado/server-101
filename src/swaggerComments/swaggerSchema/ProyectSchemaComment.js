/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - by
 *         - members
 *         - tasks
 *         - deadline
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the project
 *           example: 60c72b2f5f1b2c001c8e4b1b
 *         title:
 *           type: string
 *           description: The title of the project
 *           example: New Project
 *         by:
 *           type: string
 *           description: The user ID of the project creator
 *           example: 60c72b2f5f1b2c001c8e4b1a
 *         members:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs of project members
 *           example: [60c72b2f5f1b2c001c8e4b1a, 60c72b2f5f1b2c001c8e4b1b]
 *         tasks:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of task IDs associated with the project
 *           example: [60c72b2f5f1b2c001c8e4b1a, 60c72b2f5f1b2c001c8e4b1b]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the project was created
 *           example: 2024-06-20T10:30:00.000Z
 *         deadline:
 *           type: string
 *           format: date
 *           description: The deadline for the project
 *           example: 2024-12-31
 *         budget:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of budget IDs associated with the project
 *           example: [60c72b2f5f1b2c001c8e4b1a, 60c72b2f5f1b2c001c8e4b1b]
 */

module.exports = {}
