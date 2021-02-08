const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

// require models
const Category = require('../category')

const categories = require('../../categories.json')

// setting connection message
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Category.insertMany(categories.results)
    .then(() => console.log('Category insert is done'))
    .catch(err => console.log(err))
})
