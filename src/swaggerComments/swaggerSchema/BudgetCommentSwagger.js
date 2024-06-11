/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *           description: The amount of the expense
 *           example: 100
 *         item:
 *           type: string
 *           description: The item or service for which the expense was incurred
 *           example: Office supplies
 *
 *     BudgetDetail:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: The description of the budget detail
 *           example: Office renovation
 *         expenses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Expense'
 *           description: Array of expenses for the budget detail
 *         id:
 *           type: number
 *           description: The ID of the budget detail
 *           example: 1
 *         receit:
 *           type: string
 *           description: The receipt or reference for the budget detail
 *           example: Receipt001
 *         type:
 *           type: string
 *           description: The type of the budget detail
 *           example: Renovation
 *
 *     Budget:
 *       type: object
 *       required:
 *         - total
 *         - detail
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the budget
 *           example: 60c72b2f5f1b2c001c8e4b1b
 *         total:
 *           type: number
 *           description: The total amount of the budget
 *           example: 1000
 *         detail:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BudgetDetail'
 *           description: Array of budget details
 */

module.exports = {}
