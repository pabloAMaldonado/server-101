/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - deadline
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the task
 *           example: 60c72b2f5f1b2c001c8e4b1b
 *         name:
 *           type: string
 *           description: The name of the task
 *           example: New Task
 *         description:
 *           type: string
 *           description: The description of the task
 *           example: Task description here
 *         for:
 *           type: string
 *           description: The user assigned to the task
 *           example: 60c72b2f5f1b2c001c8e4b1a
 *         madeBy:
 *           type: string
 *           description: The user who created the task
 *           example: 60c72b2f5f1b2c001c8e4b1c
 *         state:
 *           type: string
 *           description: The state of the task
 *           example: Planeado
 *         deadline:
 *           type: string
 *           format: date
 *           description: The deadline of the task
 *           example: 2024-12-31
 *         messages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The message text
 *                 example: This is a message.
 *               by:
 *                 type: string
 *                 description: The user who wrote the message
 *                 example: 60c72b2f5f1b2c001c8e4b1d
 */

module.exports = {}
