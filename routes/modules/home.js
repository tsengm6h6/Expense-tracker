// require express router
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

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
    return Record.find()
      .lean()
      .then((record) => {
        record.forEach(item => {
          if (item.category === category) {
            filteredList.push(item)
            totalAmount = totalAmount + item.amount
          }
        })
        res.render('index', { records: filteredList, totalAmount })
      })
      .catch(err => console.log(err))
  }
})

// export router
module.exports = router