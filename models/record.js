const mongoose = require('mongoose')
const { Schema } = mongoose

const recordSchema = new Schema({
  title: { type: String, required: true }, // String is shorthand for {type: String}
  date: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, default: 0, required: true }
})

module.exports = mongoose.model('Record', recordSchema)
