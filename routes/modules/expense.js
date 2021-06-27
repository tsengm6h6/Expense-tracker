// require express router
const express = require('express')
const router = express.Router()

// require date-fns
const format = require('date-fns/format')

// require model
const Record = require('../../models/record')

// 取得新增頁面，預設日期為今天
router.get('/new', (req, res) => {
  const today = format(new Date(), 'yyyy-MM-dd')
  res.render('new', { date: today })
})

// 送出新增表單
router.post('/new', (req, res) => {
  const { title, date, category, amount, merchant } = req.body
  const formatDate = format(new Date(date), 'yyyy/MM/dd')
  const userId = req.user._id
  // 驗證必填欄位
  if (!title || !date || !category || !amount) {
    req.flash('warning_msg', '*欄位為必填，請再次確認')
    return res.render('new', { title, date, category, amount, warning_msg: req.flash('warning_msg') })
  }

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

  // 驗證必填欄位
  if (!title || !date || !category || !amount) {
    return Record.findOne({ _id, userId })
      .lean()
      // 保留已編輯的部分並返回
      .then(theRecord => {
        theRecord.title = title || ''
        theRecord.date = date || ''
        theRecord.category = category || ''
        theRecord.amount = amount || null
        theRecord.merchant = merchant || ''
        req.flash('warning_msg', '*欄位為必填，請再次確認')
        return res.render('edit', { theRecord, date, warning_msg: req.flash('warning_msg') })
      }) // 返回頁面
      .catch(err => console.log(err))
  }
  // 儲存修改資料
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
