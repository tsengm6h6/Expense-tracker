const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

// require models
const Record = require('../record')
const Category = require('../category')

// const daddyExpense = require('../../daddyExpense')

// setting connection message
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Record.find()
    .lean()
    .then(record => {
      const data = {
        household: [],
        transport: [],
        entertainment: [],
        grocery: [],
        other: []
      }
      record.forEach(item => {
        const cat = item.category
        switch (cat) {
          case 'fas fa-home':
            data.household.push(item)
            break
          case 'fas fa-shuttle-van':
            data.transport.push(item)
            break
          case 'fas fa-grin-beam':
            data.entertainment.push(item)
            break
          case 'fas fa-utensils':
            data.grocery.push(item)
            break
          case 'fas fa-pen':
            data.other.push(item)
            break
          default:
            data.other.push(item)
            console.log('category not find')
        }
      })
      Category.insertMany(data)
    })
    .then(console.log('done'))
    .catch(err => console.log(err))
})
