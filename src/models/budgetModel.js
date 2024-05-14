const mongoose = require('mongoose')

const { Schema } = mongoose

const BudgetSchema = new Schema({
  total: { type: Number, required: true },
  detail: [{
    description: { type: String, required: true },
    expenses: [{
      amount: { type: Number, required: true },
      item: { type: String, required: true }
    }],
    id: { type: Number, required: true },
    type: { type: String, required: true }
  }]
})

const Budget = mongoose.model('Budget', BudgetSchema)

module.exports = Budget
