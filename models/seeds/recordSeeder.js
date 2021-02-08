const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

// require Record model
const Record = require('../record')

const records = require('../../records.json')

// setting connection message
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Record.insertMany(records.results)
    .then(() => {
      console.log('Record insert is done')
      return db.close()
    })
    .then(() => console.log('db close'))
    .catch(err => console.log(err))
})
