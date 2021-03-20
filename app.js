// require express
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const session = require('express-session')
const routes = require('./routes')

// require db
require('./config/mongoose')
// require view engines
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    equal: function (cat, value) {
      if (cat === value) return 'selected'
    }
  }
}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.use(session({
  secret: 'DaddysSecret',
  resave: false,
  saveUninitialized: true
}))

const usePassport = require('./config/passport')
usePassport(app)
// 驗證之後，使用路由之前，將登入資訊存放在res.local
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  console.log(req.session)
  console.log(res.locals)
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
