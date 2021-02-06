// require express
const express = require('express')
const app = express()
const port = 3000

// require mongoose and connect to mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useUnifiedTopology: true })

// require view engines
const exphbs = require('express-handlebars')

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

app.get('/create', (req, res) => {
  res.render('new')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})


app.listen(port, () => {
  console.log('Listening')
})
