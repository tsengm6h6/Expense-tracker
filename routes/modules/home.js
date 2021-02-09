// require express router
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// require body-parser and setting
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))

// setting routes
router.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(item => {
        totalAmount = totalAmount + item.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

// filter
router.post('/', (req, res) => {
  const { category } = req.body
  if (category === 'all') {
    return res.redirect('/')
  } else {
    const filteredList = []
    let totalAmount = 0
    let catIcon = ''
    return Record.find()
      .lean()
      .then((record) => {
        // find the category items & count amount
        record.forEach(item => {
          if (item.category === category) {
            filteredList.push(item)
            totalAmount = totalAmount + item.amount
          }
        })
      }) // find the category icon
      .then(Category.find({ category: category })
        .lean()
        .then((cat) => {
          catIcon = cat[0].categoryIcon
        }) // put the icon to filtered item & render
        .then(() => {
          filteredList.forEach(item => {
            item.category = catIcon
          })
          res.render('index', { records: filteredList, totalAmount })
        }))
      .catch(err => console.log(err))
  }
})

// export router
module.exports = router