const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
  _id: { type: String },
  item: { type: Array }
})

module.exports = mongoose.model('Category', categorySchema)
