const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
  household: { type: Array },
  transport: { type: Array },
  entertainment: { type: Array },
  grocery: { type: Array },
  other: { type: Array }
})

module.exports = mongoose.model('Category', categorySchema)
