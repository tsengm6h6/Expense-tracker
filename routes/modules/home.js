// require express router
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// require date-fns
const format = require('date-fns/format')

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
// TODO: 重構程式碼
router.get('/', (req, res) => {
  const { category, month } = req.query
  const userId = req.user._id
  let totalAmount = 0
  return Record.find({ userId })
    .lean()
    .then((records) => {
      let filteredList = []
      if (!category || category === 'all') {
        filteredList.push(...records)
        return filteredList
      } else {
        filteredList = records.filter(item => item.category === category)
        return filteredList
      }
    })
    .then((filteredList) => {
      if (!month || month === 'all') {
        return filteredList
      } else {
        return filteredList.filter(item => {
          const itemDate = format(new Date(item.date), 'MMMM dd yyyy')
          const itemMonth = itemDate.split(' ')[0]
          return itemMonth.toLowerCase() === month.toLowerCase()
        })
      }
    })
    .then((filteredList) => {
      filteredList.forEach(item => {
        totalAmount += item.amount
        item.icon = iconList[item.category]
      })
      return filteredList
    })
    .then((filteredList) => {
      res.render('index', { records: filteredList, totalAmount, category, month })
    })
    .catch(err => console.log(err))
})

// export router
module.exports = router
