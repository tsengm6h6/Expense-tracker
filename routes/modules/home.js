// require express router
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// Log categoryIcon
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
  // const month = req.query.month
  const userId = req.user._id
  let filteredList = []
  let totalAmount = 0
  return Record.find({ userId })
    .lean()
    .then((records) => {
      if (!category || category === 'all') {
        return filteredList.push(...records)
      } else {
        filteredList = records.filter(item => item.category === category)
        return filteredList
      }
    })
    // .then((filteredList) => {
    //   console.log(filteredList)
    // })
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
