// require express
const express = require('express')
const app = express()
const port = 3000

// require mongoose and connect to mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

// require view engines
const exphbs = require('express-handlebars')

// require body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// require record model
const Record = require('./models/record')

// require moment
const moment = require('moment')

// setting template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    isSelected: function (theRecord, value) {
      if (theRecord.category === value) return 'selected'
    }
  }
}))
app.set('view engine', 'handlebars')

// setting connection message
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting routes
app.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      // count totalAmount
      let totalAmount = 0
      records.forEach(item => {
        totalAmount = totalAmount + item.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

// 點擊新增支出按鈕
app.get('/expense/new', (req, res) => {
  res.render('new')
})

// 送出新增表單
app.post('/expense/new', (req, res) => {
  const { title, category, amount } = req.body
  const date = req.body.date
  console.log(date)
  console.log(moment(date).format('YYYY/MM/DD'))

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

// 點擊修改按鈕
app.get('/expense/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(theRecord => {
      console.log(theRecord)
      // const date = theRecord.date.toISOString().split('T')[0]
      let date = new Date(theRecord.date)
      date = moment(date).format().split('T')[0]
      console.log(date)
      res.render('edit', { theRecord, date })
    })
    .catch(err => console.log(err))
})

// 送出修改表單，TODO:要改成PUT
app.post('/expense/:id/edit', (req, res) => {
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
app.post('/expense/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(theRecord => theRecord.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log('Listening')
})
