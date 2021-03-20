// require express router
const express = require('express')
const router = express.Router()

// require moment
const moment = require('moment')

// require model
const Record = require('../../models/record')

// 取得新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 送出新增表單
router.post('/new', (req, res) => {
  const { title, category, amount, merchant } = req.body
  const date = req.body.date
  const userId = req.user._id
  // TODO: 必填驗證
  return Record.create({
    title,
    date: moment(date).format('YYYY/MM/DD'),
    category,
    amount,
    merchant,
    userId
  })
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

// 取得修改頁面
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
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
  const _id = req.params.id
  const userId = req.user._id
  const { title, date, category, amount, merchant } = req.body
  return Record.findOne({ _id, userId })
    .then(theRecord => {
      theRecord.title = title
      theRecord.date = date
      theRecord.category = category
      theRecord.amount = amount
      theRecord.merchant = merchant
      return theRecord.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 刪除支出
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(theRecord => theRecord.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// export router
module.exports = router
