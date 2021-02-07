const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

// require Record model
const Record = require('../record')

const daddyExpense = require('../../daddyExpense')

// setting connection message
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Record.insertMany(daddyExpense.results)
  console.log('done')
})
