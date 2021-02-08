// require db
const db = require('../../config/mongoose')

// require models
const Category = require('../category')
const categories = require('../../categories.json')

db.once('open', () => {
  Category.insertMany(categories.results)
    .then(() => console.log('Category insert is done'))
    .catch(err => console.log(err))
})
