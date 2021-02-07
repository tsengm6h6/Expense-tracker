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
      const data = [
        {
          _id: 'fas fa-home',
          item: []
        },
        {
          _id: 'fas fa-shuttle-van',
          item: []
        },
        {
          _id: 'fas fa-grin-beam',
          item: []
        },
        {
          _id: 'fas fa-utensils',
          item: []
        },
        {
          _id: 'fas fa-pen',
          item: []
        }
      ]
      record.forEach(item => {
        const cat = item.category
        switch (cat) {
          case 'fas fa-home':
            data[0].item.push(item)
            break
          case 'fas fa-shuttle-van':
            data[1].item.push(item)
            break
          case 'fas fa-grin-beam':
            data[2].item.push(item)
            break
          case 'fas fa-utensils':
            data[3].item.push(item)
            break
          case 'fas fa-pen':
            data[4].item.push(item)
            break
          default:
            data[4].item.push(item)
            console.log('category not find')
        }
      })
      console.log(data)
      Category.insertMany(data)
    })
    .then(console.log('done'))
    .catch(err => console.log(err))
})
