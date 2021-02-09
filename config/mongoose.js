// require mongoose and connect to mongodb
const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/expense'
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

// setting connection message
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
