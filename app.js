// require express
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// require db
require('./config/mongoose')

// require routes
const routes = require('./routes')
app.use(routes)

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

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
