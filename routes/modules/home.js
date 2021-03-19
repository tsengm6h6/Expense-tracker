// require express router
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// Log catIcon
const iconList = {}
Category.find()
  .lean()
  .then(cat => {
    cat.forEach(item => {
      iconList[item.category] = item.categoryIcon
    })
  })
  .catch(err => console.log(err))

// setting routes
router.get('/', (req, res) => {
  const category = req.query.category
  let filteredList = []
  let totalAmount = 0
  return Record.find()
    .lean()
    .then((records) => {
      if (!category || category === 'all') {
        filteredList.push(...records)
      } else {
        filteredList = records.filter(item => item.category === category)
      }
    })
    .then(() => {
      filteredList.forEach(item => {
        totalAmount += item.amount
        item.icon = iconList[item.category]
      })
    })
    .then(() => {
      res.render('index', { records: filteredList, totalAmount, category })
    })
    .catch(err => console.log(err))
})

// export router
module.exports = router
