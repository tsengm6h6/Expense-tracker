// require express router
const express = require('express')
const router = express.Router()

// require date-fns
const format = require('date-fns/format')

// require model
const Record = require('../../models/record')

// 取得新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 送出新增表單
router.post('/new', (req, res) => {
  const { title, date, category, amount, merchant } = req.body
  const formatDate = format(new Date(date), 'yyyy/MM/dd')
  const userId = req.user._id
  // TODO: 必填驗證
  return Record.create({
    title,
    date: formatDate,
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
      const formatDate = format(new Date(theRecord.date), 'yyyy-MM-dd')
      res.render('edit', { theRecord, date: formatDate })
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
      theRecord.date = format(new Date(date), 'yyyy/MM/dd')
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
