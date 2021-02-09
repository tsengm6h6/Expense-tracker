// require express router
const express = require('express')
const router = express.Router()

// require model
const Record = require('../../models/record')

// require moment
const moment = require('moment')

// require method-override and setting
const methodOverride = require('method-override')
router.use(methodOverride('_method'))

// require body-parser and setting
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))

// 取得新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 送出新增表單
router.post('/new', (req, res) => {
  const { title, category, amount } = req.body
  const date = req.body.date
  // TODO: 必填驗證
  return Record.create({
    title,
    date: moment(date).format('YYYY/MM/DD'),
    category,
    amount
  })
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

// 取得修改頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(theRecord => {
      let date = new Date(theRecord.date)
      date = moment(date).format().split('T')[0]
      res.render('edit', { theRecord, date })
    })
    .catch(err => console.log(err))
})

// 編輯支出
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { title, date, category, amount } = req.body
  return Record.findById(id)
    .then(theRecord => {
      theRecord.title = title
      theRecord.date = date
      theRecord.category = category
      theRecord.amount = amount
      return theRecord.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 刪除支出
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(theRecord => theRecord.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// export router
module.exports = router
