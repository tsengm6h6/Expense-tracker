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

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
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
  res.render('index')
})

// 點擊新增支出按鈕
app.get('/expense/new', (req, res) => {
  res.render('new')
})

// 點擊修改按鈕
app.get('/edit/:id', (req, res) => {
  res.render('edit')
})

// 送出新增表單
app.post('/expense', (req, res) => {
  const { title, date, category, amount } = req.body
  return Record.create({ title, date, category, amount })
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log('Listening')
})
